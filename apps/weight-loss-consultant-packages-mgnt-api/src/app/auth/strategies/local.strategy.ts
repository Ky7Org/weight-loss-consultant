import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  //1:configure set of options that are specific to that strategy
  constructor(private authService: AuthService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password'
      }
    );
  }

  //2: a verify callback, tell Passport how to interact with user store
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(`Unauthorized user with email: ${username}`);
    }
    return user;
  }
}
