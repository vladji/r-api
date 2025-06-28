import { Request } from "express";

export enum UserRole {
  Admin = "admin",
  Shop = "shop",
}

interface LoginBody {
  uniqId: string;
  password: string;
}

export type LoginRequest = Request<{}, {}, LoginBody>
