import { AppDataSource } from "../data-source";
import { Favourite } from "../entity/Favourite";
import { Movie } from "../entity/Movie";

export class FavouriteController {
    static async getFavourites(req, res) {
        if (!req[" currentUser"]) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = req[" currentUser"]
        const favouritesRepository = AppDataSource.getRepository(Favourite);
        const favourites = await favouritesRepository.find({ select: { user } });
        return res.status(200).json(favourites)

    }
    static async createFavourite(req, res) {
        if (!req[" currentUser"]) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { movie_id } = req.body;
        const movieRepository = AppDataSource.getRepository(Movie);
        const movie = await movieRepository.findOne({
            where: { id: movie_id },
        });
        const user = req[" currentUser"]
        const favourite = new Favourite();
        favourite.user = user;
        favourite.movie = movie;
        const favouritesRepository = AppDataSource.getRepository(Favourite);
        await favouritesRepository.save(favourite);
        return res
            .status(200)
            .json({ message: "Favourite created successfully", favourite });
    }

    static async deleteFavourite(req, res) {
        const { id } = req.params;
        const favouritesRepository = AppDataSource.getRepository(Favourite);
        const favourite = await favouritesRepository.findOne({
            where: { id },
        });
        await favouritesRepository.remove(favourite);
        res.status(200).json({ message: "ok" });
    }
}
