import * as express from "express";
import { authentication } from "../middleware/authentication";
import { FavouriteController } from "../controllers/favourite";

const Router = express.Router();

Router.get("/favourites", authentication, FavouriteController.getFavourites);
Router.post("/favourites", authentication, FavouriteController.createFavourite);
Router.delete(
    "/favourites/:id",
    authentication,
    FavouriteController.deleteFavourite
);

export { Router as favouriteRouter };
