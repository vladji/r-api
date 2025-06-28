import express, { NextFunction, Response } from "express";
import {
  adminLogin,
  logout,
  refreshToken,
  sellerLogin
} from "./auth.controller";
import { LoginRequest } from "./types";

const router = express.Router();

router.post("/auth/login",
  async (req: LoginRequest, res: Response, next: NextFunction) => {
    try {
      const { uniqId } = req.body;

      if (uniqId === process.env.ADMIN_NAME) {
        return adminLogin(req, res);
      } else {
        return sellerLogin(req, res);
      }
    } catch (err) {
      next(err);
    }
  });

router.post("/auth/refresh-token", refreshToken);
router.post("/auth/logout", logout);

export default router;
