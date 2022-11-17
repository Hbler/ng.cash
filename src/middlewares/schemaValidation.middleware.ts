import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const schemaValidationMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const validatedData = await schema.validate(data);
      req.body = validatedData;
      next();
    } catch (error: any) {
      return res.status(400).json({
        message: error.errors?.join(", "),
      });
    }
  };

export default schemaValidationMiddleware;
