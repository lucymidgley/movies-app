import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";
import { UserResponse } from "../dto/user";

export class UserController {
  static async signup(req, res) {
    const { name, email, password } = req.body;
    const encryptedPassword = await encrypt.encryptPassword(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
    const userDataSent = new UserResponse();
    userDataSent.name = user.name;
    userDataSent.email = user.email;

    const token = encrypt.generateToken(userDataSent);
    return res
      .status(200)
      .json({ message: "User created successfully", token, userDataSent });
  }
  static async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: Number(id) },
    });
    user.name = name;
    user.email = email;
    await userRepository.save(user);
    res.status(200).json({ message: "update", user });
  }
}
