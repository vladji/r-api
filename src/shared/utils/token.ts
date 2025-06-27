import jwt from "jsonwebtoken";
import { TokenPayload } from "../../types/token";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export const generateAccessToken = (data: TokenPayload) => {
  return jwt.sign(data, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (data: TokenPayload) => {
  return jwt.sign(data, REFRESH_SECRET, { expiresIn: "7d" });
};
