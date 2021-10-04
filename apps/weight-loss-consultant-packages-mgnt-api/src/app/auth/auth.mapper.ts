import {LoginRequest} from "./login.req";
import {Injectable} from "@nestjs/common";
import {LoginResponse} from "./login.res";

@Injectable()
export class AuthMapper {

  static async mapValueToLoginRequestObj(email: string, password: string) : Promise<LoginRequest | null> {
    if (email === null || email === undefined || password === null || password === undefined) {
      return null;
    }
    const req = new LoginRequest();
    req.email = email;
    req.password = password;

    return req;
  }

  static async mapValueToLoginResponseObj(value: string) : Promise<LoginResponse | null> {
    if (value === null || value === undefined) {
      return null;
    }
    const res = new LoginResponse();
    res.accessToken = value;
    return res;
  }
}

