import {Inject, Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { AUTHENTICATION_SERVICE_NAME } from '../../../../../../constant';
import {Client, ClientKafka, ClientProxy, EventPattern} from '@nestjs/microservices';
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
import { LoginRequest } from '../../models/login.req';
import {lastValueFrom} from "rxjs";
import {KAFKA_AUTHENTICATION_SERVICE} from "../../../../../common/kafka-utils";

@Injectable()
export class AuthenticationService implements OnModuleInit, OnModuleDestroy {

  @Client(KAFKA_AUTHENTICATION_SERVICE)
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('authentication.login');
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async login(dto: LoginRequest): Promise<LoginResponseModel> {
      return this.client
        .send('authentication.login', dto).toPromise();
  }


  async resetPassword(dto: ResetPasswordRequestModel): Promise<any> {
    const pattern = { cmd: RESET_PASSWORD };
    const payload = dto;
    // return this.authenticationServiceProxy.send(pattern, payload).toPromise<any>();
    return this.client.send(pattern, payload).toPromise();
  }

  async confirmChangePassword(dto: ResetPasswordConfirmRequestModel) {
    const pattern = { cmd: CONFIRM_CHANGE_PASSWORD };
    const payload = dto;
    // return this.authenticationServiceProxy.send(pattern, payload).toPromise<any>();
    return this.client.send(pattern, payload).toPromise();
  }

  async validateAccount(email: string, password: string) {
    const pattern = { cmd: VALIDATE_ACCOUNT };
    const payload = {email: email, password: password};
    // return this.authenticationServiceProxy.send(pattern, payload).toPromise<any>();
    return this.client.send(pattern, payload).toPromise();
  }

  async loginWithFirebase(firebaseUserToken: any): Promise<any> {
    const pattern = {cmd: GOOGLE_FIREBASE_AUTHENTICATE_USER}
    return this.client.send<any, any>(pattern, firebaseUserToken)
      // .toPromise<any>();
      .toPromise();
    return this.client.send<any, any>(pattern, firebaseUserToken).toPromise();
  }
}
