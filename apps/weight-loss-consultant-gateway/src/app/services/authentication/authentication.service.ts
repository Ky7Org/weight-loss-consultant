import {Inject, Injectable} from "@nestjs/common";
import {AUTHENTICATION_SERVICE_NAME} from "../../../../../../constant";
import {ClientProxy} from "@nestjs/microservices";
import { LoginResponseModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/login-response-model';
import { LoginRequest } from '../../auth/login.req';
import { ResetPasswordRequestModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-request-model';
import { ResetPasswordConfirmRequestModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-confirm-request-model';
import {
  CONFIRM_CHANGE_PASSWORD,
  EMAIL_PASSWORD_AUTHENTICATE_USER,
  RESET_PASSWORD, VALIDATE_ACCOUNT
} from '../../../../../authentication-routes';
@Injectable()
export class AuthenticationService {

  constructor(@Inject(AUTHENTICATION_SERVICE_NAME)
              private readonly authenticationServiceProxy: ClientProxy) {}

  async login(dto: LoginRequest): Promise<LoginResponseModel> {
    const pattern = { cmd: EMAIL_PASSWORD_AUTHENTICATE_USER };
    const payload = dto;

      return this.authenticationServiceProxy.send(pattern, payload)
        .toPromise<LoginResponseModel>();
  }


  async resetPassword(dto: ResetPasswordRequestModel): Promise<any> {
    const pattern = { cmd: RESET_PASSWORD };
    const payload = dto;
    return this.authenticationServiceProxy.send(pattern, payload).toPromise<any>();
  }

  async confirmChangePassword(dto: ResetPasswordConfirmRequestModel) {
    const pattern = { cmd: CONFIRM_CHANGE_PASSWORD };
    const payload = dto;
    return this.authenticationServiceProxy.send(pattern, payload).toPromise<any>();
  }

  async validateAccount(email: string, password: string) {
    const pattern = { cmd: VALIDATE_ACCOUNT };
    const payload = {email: email, password: password};
    return this.authenticationServiceProxy.send(pattern, payload).toPromise<any>();
  }
}
