import { Request, Response } from "express";
import { LoginRequest } from "./types";
import { AdminSchema } from "../admin/admin.model";
import { errorHandler } from "../../shared/middlewares/errorHandler";
import { generateAccessToken } from "../../shared/utils/token";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../../types/token";
import { CookiesKeys } from "../../config/constants";
import { ShopSchema } from "../shop/shop.model";
import { authenticate } from "./utils/authenticate";
import { UserRole } from "../../types/user";

const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const adminLogin = async (req: LoginRequest, res: Response) => {
  const { uniqId, password } = req.body;

  AdminSchema
    .findOne({ uniqId: { $eq: uniqId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passHash = user!.credentials!.rootPassHash;

      return authenticate({
        uniqId,
        password,
        passHash,
        roles: { [UserRole.Admin]: true },
        res
      });
    })
    .catch((error) => errorHandler(error, req, res));
};

export const shopLogin = async (req: LoginRequest, res: Response) => {
  const { uniqId, password } = req.body;

  ShopSchema
    .findOne({ uniqId: { $eq: uniqId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passHash = user!.credentials!.rootPassHash!;

      return authenticate(
        { uniqId, password, passHash, roles: { [UserRole.Shop]: true }, res });
    })
    .catch((error) => errorHandler(error, req, res));
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies[CookiesKeys.refreshToken];

  if (!token) {
    res.status(401).json({ message: "Token not found" });
    return;
  }

  try {
    const payload = jwt.verify(token, REFRESH_SECRET) as TokenPayload;
    const newAccessToken = generateAccessToken(
      { uniqId: payload.uniqId, roles: payload.roles });
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.clearCookie(CookiesKeys.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      path: "/"
    });

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Refresh token expired" });
      return;
    }

    res.status(403).json({ message: "Invalid refresh token" });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie(CookiesKeys.refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    path: "/"
  });
  res.sendStatus(200);
};
