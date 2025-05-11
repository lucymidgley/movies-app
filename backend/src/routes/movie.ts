import * as express from "express";
import { authentication } from "../middleware/authentication";
import { MovieController } from "../controllers/movie";

const Router = express.Router();

Router.get("/movies", MovieController.getMovies);
Router.post("/movies", authentication, MovieController.createMovie);
Router.put(
    "/movies/:id",
    authentication,
    MovieController.updateMovie
);

export { Router as movieRouter };
