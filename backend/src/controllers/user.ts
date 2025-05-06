import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";
import { UserResponse } from "../dto/user";
import * as cache from "memory-cache";

export class UserController {
  static async signup(req, res) {
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
  static async getUsers(req, res) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return res.status(200).json({
        data: users,
      });
    }
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

  static async deleteUser(req, res) {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: Number(id) },
    });
    await userRepository.remove(user);
    res.status(200).json({ message: "ok" });
  }
}
