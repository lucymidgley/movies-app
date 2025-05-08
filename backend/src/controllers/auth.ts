import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";
import * as cookie from 'cookie'

export class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(500)
          .json({ message: " email and password required" });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      const isPasswordValid = encrypt.comparePassword(user.password, password);
      if (!user || !isPasswordValid) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = encrypt.generateToken(user);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize('token', token, {
          secure: true, httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        })
      )
      return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req, res) {
    if (!req[" currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req[" currentUser"].id },
    });
    return res.status(200).json({ ...user, password: undefined });
  }
}
