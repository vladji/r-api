import { Request } from "express";

export enum UserRole {
  Admin = 'admin',
  Seller = 'seller',
}

interface LoginBody {
  uniqId: string;
  password: string;
}

export type LoginRequest = Request<{}, {}, LoginBody>
