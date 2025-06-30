import { UserRole } from "./user";

export interface TokenPayload {
  uniqId: string;
  roles: Partial<Record<UserRole, boolean>>;
}
