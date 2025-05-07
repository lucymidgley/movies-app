import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { UserResponse } from "../dto/user";

dotenv.config();
const JWT_SECRET = "devsecret"
export class encrypt {
  static async encryptPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparePassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: UserResponse) {
    return jwt.sign({ name: payload.name, id: payload.id, email: payload.email }, JWT_SECRET, { expiresIn: 3600 });
  }
}