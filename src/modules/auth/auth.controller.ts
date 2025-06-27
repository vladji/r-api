import { Request, Response } from "express";
import { LoginRequest } from "./types";
import { AdminSchema } from "../admin/admin.model";
import { errorHandler } from "../../shared/middlewares/errorHandler";
import { checkPassword } from "../../shared/utils/crypto";
import {
  generateAccessToken,
  generateRefreshToken
} from "../../shared/utils/token";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../../types/token";
import { CookiesKeys } from "../../config/constants";

const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const adminLogin = async (req: LoginRequest, res: Response) => {
  const { uniqId, password } = req.body;

  AdminSchema
    .findOne({ uniqId: { $eq: uniqId } })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isValidPass = await checkPassword(password, user.passHash);

      if (!isValidPass) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const accessToken = generateAccessToken({ uniqId, role: "admin" });
      const refreshToken = generateRefreshToken({ uniqId, role: "admin" });

      res.cookie(CookiesKeys.refreshToken, refreshToken, {
        httpOnly: true,
        secure: !(process.env.NODE_ENV === "development"), // only HTTPS
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.status(200).json({ accessToken });
    })
    .catch((error) => errorHandler(error, req, res));
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies[CookiesKeys.refreshToken];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const payload = jwt.verify(token, REFRESH_SECRET) as TokenPayload;
    const newAccessToken = generateAccessToken(
      { uniqId: payload.uniqId, role: payload.role });
    res.status(200).json({ accessToken: newAccessToken });
  } catch {
    res.clearCookie(CookiesKeys.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.status(403).json({ message: "Refresh token expired or invalid" });
    return;
  }
};

export const clientLogin = async (req: LoginRequest, res: Response) => {
  const uniqId = req.body?.uniqId;
};
