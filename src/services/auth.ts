import { api } from "../lib/api";
import type { AuthRequest, AuthResponse } from "@/models";

export default class AuthService {
  public async signin(data: AuthRequest): Promise<AuthResponse> {
    console.log(data);
    const { data: authentication } = await api.post<AuthResponse>("auth", data);
    return authentication;
  }
}
