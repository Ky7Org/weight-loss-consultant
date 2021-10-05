import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import { AUTHENTICATION_SERVICE_NAME } from '../../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';

export const VALIDATE_AUTH_USER = 'validate-auth-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  //1:configure set of options that are specific to that strategy
  constructor(@Inject(AUTHENTICATION_SERVICE_NAME) private readonly authServiceProxy: ClientProxy) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password'
      }
    );
  }

  //2: a verify callback, tell Passport how to interact with user store
  async validate(username: string, password: string): Promise<any> {
    console.log(username + " " + password);
    const user = await this.authServiceProxy.send<any, any>
    ({cmd: VALIDATE_AUTH_USER}, {username: username, password: password})
      .toPromise();
    console.log(user);
    if (!user) {
      throw new UnauthorizedException(`Unauthorized user with email: ${username}`);
    }
    return user;
  }
}
