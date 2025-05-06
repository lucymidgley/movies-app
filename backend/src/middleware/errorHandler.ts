import { NextFunction, Request, Response } from "express";

export const errorHandler = (error, req, res, _next) => {
  console.error(`Error: ${error.message}`);
  return res.status(500).json({ message: "Internal server error" });
};
