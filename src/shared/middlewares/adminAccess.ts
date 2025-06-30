import { NextFunction, Request, Response } from "express";

export const adminAccessMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.roles?.admin) {
    res.status(403).json(
      { message: "You are not authorized to access this page" });
    return;
  }
  next();
};
