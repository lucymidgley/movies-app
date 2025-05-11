import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Movie } from "../entity/Movie";

export class MovieController {
  static async getMovies(req, res) {
    const movies = cache.get("movies");
    if (movies) {
      console.log("serving from cache");
      return res.status(200).json(movies);
    } else {
      console.log("serving from db");
      const movieRepository = AppDataSource.getRepository(Movie);
      const movies = await movieRepository.find();
      cache.put("movies", movies, 10000);
      return res.status(200).json(movies)
    }
  }
  static async createMovie(req, res) {
    const { title, description, director, year, rating, image, cast } =
      req.body;
    const movie = new Movie();
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    movie.image = image;
    const movieRepository = AppDataSource.getRepository(Movie);
    await movieRepository.save(movie);
    return res
      .status(200)
      .json({ message: "Movie created successfully", movie });
  }

  static async updateMovie(req, res) {
    const { id } = req.params;
    const { title, description, director, year, rating, image } =
      req.body;
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id },
    });
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    movie.image = image;
    await movieRepository.save(movie);
    return res.status(200)
      .json({ message: "Movie updated successfully", movie });
  }
}
