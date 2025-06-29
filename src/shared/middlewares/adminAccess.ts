import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../types/user";

export const adminAccessMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== UserRole.Admin) {
    res.status(403).json(
      { message: "You are not authorized to access this page" });
    return;
  }
  next();
};
