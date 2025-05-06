import * as express from "express";
import { authentication } from "../middleware/authentication";
import { MovieController } from "../controllers/movie";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/movies", authentication, MovieController.getMovies);
Router.post("/movies", authentication, MovieController.createMovie);

Router.put(
  "/movies/:id",
  authentication,
  authorization(["admin"]),
  MovieController.updateMovie
);
Router.delete(
  "/movies/:id",
  authentication,
  authorization(["admin"]),
  MovieController.deleteMovie
);
export { Router as movieRouter };
