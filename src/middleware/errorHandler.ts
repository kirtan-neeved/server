import type { Request, Response, NextFunction } from "express";

// Inherits Error class to add statusCode
interface CustomeError extends Error {
  statusCode: number;
}

export const errorHandler = (
  err: CustomeError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode;
  const errorMessage = err.message;

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};
