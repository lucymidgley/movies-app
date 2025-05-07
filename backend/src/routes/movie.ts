import * as express from "express";
import { authentication } from "../middleware/authentication";
import { MovieController } from "../controllers/movie";

const Router = express.Router();

Router.get("/movies", authentication, MovieController.getMovies);
Router.post("/movies", authentication, MovieController.createMovie);

export { Router as movieRouter };
