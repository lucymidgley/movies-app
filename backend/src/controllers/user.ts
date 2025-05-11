import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";
import { UserResponse } from "../dto/user";
import * as cookie from 'cookie'
const nodemailer = require('nodemailer')

export class UserController {
  static async signup(req, res) {
    const { name, email, password } = req.body;
    const encryptedPassword = await encrypt.encryptPassword(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    const emailToken = encrypt.generateEmailToken(user.email);
    user.emailToken = emailToken

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
    const userDataSent = new UserResponse();
    userDataSent.name = user.name;
    userDataSent.email = user.email;

    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "branson.hessel67@ethereal.email",
        pass: "T8buUyBX5PpuaEdYxw",
      },
    });
    (async () => {
      const info = await transporter.sendMail({
        from: '"Branson Hessel" <branson.hessel67@ethereal.email>',
        to: user.email,
        subject: "New Account Created",
        text: "Your account on Film Finder has been created, click here to confirm your email and start using your account.",
        html: `<b>Your account on Film Finder has been created, click <a href="http://localhost:8080/auth/verify/${user.id}/${emailToken}">here</a> to confirm your email and start using your account.</b>`,
      });

      console.log("Message sent:", info.messageId);
    })();
    const token = encrypt.generateToken(userDataSent);
    res.setHeader(
      "Set-Cookie",
      cookie.serialize('token', token, {
        secure: true, httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      })
    )
    return res
      .status(200)
      .json({ message: "User created successfully", userDataSent });
  }


  static async verifyEmail(req, res) {
    const { emailToken, id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: Number(id) },
    });
    if (!emailToken!! || emailToken !== user.emailToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    user.confirmed = true
    user.emailToken = null
    await userRepository.save(user);
    res.redirect("http://localhost:3000/verified")
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
