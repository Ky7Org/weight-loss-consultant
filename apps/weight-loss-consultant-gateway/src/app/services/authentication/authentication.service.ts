import { Inject, Injectable } from '@nestjs/common';
import { AUTHENTICATION_SERVICE_NAME } from '../../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { LoginRequest } from '../../auth/login.req';
import {
  CONFIRM_CHANGE_PASSWORD,
  EMAIL_PASSWORD_AUTHENTICATE_USER,
  GOOGLE_FIREBASE_AUTHENTICATE_USER,
  RESET_PASSWORD,
  VALIDATE_ACCOUNT
} from '../../../../../common/routes/authentication-routes';
import { LoginResponseModel } from '../../models/login-response-model';
import { ResetPasswordConfirmRequestModel } from '../../models/reset-password-confirm-request-model';
import { ResetPasswordRequestModel } from '../../models/reset-password-request-model';

@Injectable()
export class AuthenticationService {

  constructor(@Inject(AUTHENTICATION_SERVICE_NAME)
              private readonly authenticationServiceProxy: ClientProxy) {}

  async login(dto: LoginRequest): Promise<LoginResponseModel> {
    const pattern = { cmd: EMAIL_PASSWORD_AUTHENTICATE_USER };
    const payload = dto;

      return this.authenticationServiceProxy.send(pattern, payload)
        // .toPromise<LoginResponseModel>();
        .toPromise();
  }


  async resetPassword(dto: ResetPasswordRequestModel): Promise<any> {
    const pattern = { cmd: RESET_PASSWORD };
    const payload = dto;
    // return this.authenticationServiceProxy.send(pattern, payload).toPromise<any>();
    return this.authenticationServiceProxy.send(pattern, payload).toPromise();
  }

  async confirmChangePassword(dto: ResetPasswordConfirmRequestModel) {
    const pattern = { cmd: CONFIRM_CHANGE_PASSWORD };
    const payload = dto;
    // return this.authenticationServiceProxy.send(pattern, payload).toPromise<any>();
    return this.authenticationServiceProxy.send(pattern, payload).toPromise();
  }

  async validateAccount(email: string, password: string) {
    const pattern = { cmd: VALIDATE_ACCOUNT };
    const payload = {email: email, password: password};
    // return this.authenticationServiceProxy.send(pattern, payload).toPromise<any>();
    return this.authenticationServiceProxy.send(pattern, payload).toPromise();
  }

  async loginWithFirebase(firebaseUser: any): Promise<any> {
    const pattern = {cmd: GOOGLE_FIREBASE_AUTHENTICATE_USER}
    return this.authenticationServiceProxy.send<any, any>(pattern, firebaseUser)
      // .toPromise<any>();
      .toPromise();
  }
}
