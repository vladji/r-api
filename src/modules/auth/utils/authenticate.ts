import { Response } from "express";
import { checkPassword } from "../../../shared/utils/crypto";
import {
  generateAccessToken,
  generateRefreshToken
} from "../../../shared/utils/token";
import { CookiesKeys } from "../../../config/constants";
import { UserRole } from "../../../types/user";

interface UserProps {
  uniqId: string;
  passHash: string;
}

interface AuthenticateProps {
  user: UserProps | null;
  uniqId: string;
  password: string;
  role: UserRole;
  res: Response;
}

export const authenticate = async ({
  user,
  uniqId,
  password,
  role,
  res
}: AuthenticateProps) => {
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isValidPass = await checkPassword(password, user.passHash);

  if (!isValidPass) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken({ uniqId, role });
  const refreshToken = generateRefreshToken({ uniqId, role });

  res.cookie(CookiesKeys.refreshToken, refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/"
  });

  res.status(200).json({ accessToken });
};
