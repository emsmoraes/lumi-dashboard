import { BaseInt } from "./base.model";

export interface User extends BaseInt {
  name: string;
  email: string;
  password: string;
}
