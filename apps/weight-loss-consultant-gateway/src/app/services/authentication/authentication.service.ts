import {Inject, Injectable} from "@nestjs/common";
import {AUTHENTICATION_SERVICE_NAME} from "../../../../../../constant";
import {ClientProxy} from "@nestjs/microservices";
import {CustomerDTO} from "../../../../../weight-loss-consultant-authentication/src/app/dtos/customer.dto";
import {TrainerDTO} from "../../../../../weight-loss-consultant-authentication/src/app/dtos/trainer.dto";
import {LoginResponseModel} from "../../../../../weight-loss-consultant-authentication/src/app/models/login-response-model";
import {ResetPasswordRequestModel} from "../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-request-model";
import {ResetPasswordConfirmRequestModel} from "../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-confirm-request-model";

export const LOGIN = "login";
export const RESET_PASSWORD = "reset-password";
export const CONFIRM_CHANGE_PASSWORD = "confirm-change-password";

@Injectable()
export class AuthenticationService {

  constructor(@Inject(AUTHENTICATION_SERVICE_NAME) private readonly authenticationService: ClientProxy) {}

  async login(dto: CustomerDTO | TrainerDTO): Promise<LoginResponseModel> {
    const pattern = { cmd: LOGIN };
    const payload = dto;
    return this.authenticationService.send(pattern, payload).toPromise<LoginResponseModel>();
  }


  async resetPassword(dto: ResetPasswordRequestModel): Promise<any> {
    const pattern = { cmd: RESET_PASSWORD };
    const payload = dto;
    return this.authenticationService.send(pattern, payload).toPromise<any>();
  }

  async confirmChangePassword(dto: ResetPasswordConfirmRequestModel) {
    const pattern = { cmd: CONFIRM_CHANGE_PASSWORD };
    const payload = dto;
    return this.authenticationService.send(pattern, payload).toPromise<any>();
  }
}
