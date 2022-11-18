import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

const handleErrorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.log("=".repeat(20));
  return res.status(500).json({
    message: error.message,
  });
};

export default handleErrorMiddleware;
