import { UserRole } from "./user";

export interface TokenPayload {
  uniqId: string;
  role: UserRole;
}
