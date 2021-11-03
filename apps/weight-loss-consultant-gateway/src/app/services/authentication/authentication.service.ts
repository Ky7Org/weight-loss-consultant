import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {Client, ClientKafka} from '@nestjs/microservices';
import { LoginResponseModel } from '../../models/login-response-model';
import { ResetPasswordConfirmRequestModel } from '../../models/reset-password-confirm-request-model';
import { ResetPasswordRequestModel } from '../../models/reset-password-request-model';
import { LoginRequest } from '../../models/login.req';
import {lastValueFrom} from "rxjs";
import {KAFKA_AUTHENTICATION_MESSAGE_PATTERN, KAFKA_AUTHENTICATION_SERVICE} from "../../../../../common/kafka-utils";

@Injectable()
export class AuthenticationService implements OnModuleInit, OnModuleDestroy {

  @Client(KAFKA_AUTHENTICATION_SERVICE)
  client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(KAFKA_AUTHENTICATION_MESSAGE_PATTERN)) {
      this.client.subscribeToResponseOf(value);
    }
    this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  login(dto: LoginRequest): Promise<LoginResponseModel> {
    console.log(dto);
      return lastValueFrom(this.client.send(KAFKA_AUTHENTICATION_MESSAGE_PATTERN.login, dto));
  }

  resetPassword(dto: ResetPasswordRequestModel) {
    return lastValueFrom(this.client.send(KAFKA_AUTHENTICATION_MESSAGE_PATTERN.resetPassword, dto));
  }

  confirmChangePassword(dto: ResetPasswordConfirmRequestModel) {
    return lastValueFrom(this.client.send(KAFKA_AUTHENTICATION_MESSAGE_PATTERN.confirmResetPassword, dto));
  }

  validateAccount(email: string, password: string) {
    return lastValueFrom(this.client
      .send(KAFKA_AUTHENTICATION_MESSAGE_PATTERN.validateAccount, {email: email, password: password}));
  }

  loginWithFirebase(firebaseUserToken: string) {
    return lastValueFrom(this.client.send(KAFKA_AUTHENTICATION_MESSAGE_PATTERN.loginWithFirebase, firebaseUserToken))
  }
}
