import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user";
import { movieRouter } from "./routes/movie";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();
const cors = require('cors')

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(errorHandler);
const { PORT = 8080 } = process.env;
app.use("/auth", userRouter);
app.use("/api", movieRouter);

app.get(/(.*)/, (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
