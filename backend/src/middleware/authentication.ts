import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = "devsecret"

export const authentication = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decode = jwt.verify(token, JWT_SECRET);
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req[" currentUser"] = decode;
  next();
};
