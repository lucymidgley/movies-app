import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Movie } from "../entity/Movie";

export class MovieController {
  static async getMovies(req, res) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const movieRepository = AppDataSource.getRepository(Movie);
      const movies = await movieRepository.find();
      cache.put("data", movies, 10000);
      return res.status(200).json({
        data: movies,
      });
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
    movie.cast = cast;
    const movieRepository = AppDataSource.getRepository(Movie);
    await movieRepository.save(movie);
    return res
      .status(200)
      .json({ message: "Movie created successfully", movie });
  }
}
