import * as express from "express";
import { authentication } from "../middleware/authentication";
import { UserController } from "../controllers/user";
import { AuthController } from "../controllers/auth";
const Router = express.Router();

Router.get(
  "/profile",
  authentication,
  AuthController.getProfile
);
Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);
Router.delete("/signout", authentication, AuthController.signOut);
Router.put(
  "/update/:id",
  authentication,
  UserController.updateUser
);
Router.get(
  "/verify/:id/:emailToken",
  UserController.verifyEmail
);
export { Router as userRouter };
