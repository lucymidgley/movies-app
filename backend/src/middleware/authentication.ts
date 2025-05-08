import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as cookie from 'cookie'
const JWT_SECRET = "devsecret"

export const authentication = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token
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
