import express, { NextFunction, Response } from "express";
import { adminLogin, clientLogin, refreshToken } from "./auth.controller";
import { LoginRequest } from "./types";

const router = express.Router();

router.post("/login",
  async (req: LoginRequest, res: Response, next: NextFunction) => {
    try {
      const { uniqId } = req.body;

      if (uniqId === process.env.ADMIN_NAME) {
        return adminLogin(req, res);
      } else {
        return clientLogin(req, res);
      }
    } catch (err) {
      next(err);
    }
  });

router.post("/refresh-token", refreshToken);

export default router;
