import type { BaseInt } from "./base.model";
import type { User } from "./user.model";

export interface Token {
  token: string;
  type: string;
}

export type AuthRequest = Pick<User, "email" | "password">;

export interface AuthResponse {
  token: Token;
}

export interface ValidationCode extends BaseInt {
  code: string;
  was_validated: boolean;
  user_id: string;
  user: User;
  token: Token;
}
