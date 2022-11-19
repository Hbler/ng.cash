import "dotenv/config";

import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

const tokenValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token || !token.includes("Bearer")) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: "Token inválido",
        });
      }

      req.user = {
        id: decoded.sub,
        username: decoded.username,
      };

      next();
    }
  );
};

export default tokenValidationMiddleware;
