import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";
import { UserResponse } from "../dto/user";

export class UserController {
  static async signup(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptPassword(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
    const userDataSent = new UserResponse();
    userDataSent.name = user.name;
    userDataSent.email = user.email;
    userDataSent.role = user.role;

    const token = encrypt.generateToken(userDataSent);
    return res
      .status(200)
      .json({ message: "User created successfully", token, userDataSent });
  }
}
