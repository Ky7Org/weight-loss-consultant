import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginResponseModel } from '../../models/login-response-model';
import { ResetPasswordConfirmRequestModel } from '../../models/reset-password-confirm-request-model';
import { ResetPasswordRequestModel } from '../../models/reset-password-request-model';
import { LoginRequest } from '../../models/login.req';
import { lastValueFrom } from 'rxjs';
import { KAFKA_AUTHENTICATION_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../../common/kafka-utils';

@Injectable()
export class AuthenticationService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN)) {
      this.client.subscribeToResponseOf(value);
    }
    this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  login(dto: LoginRequest): Promise<LoginResponseModel> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.login, dto));
  }

  resetPassword(dto: ResetPasswordRequestModel) {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.resetPassword, dto));
  }

  confirmChangePassword(dto: ResetPasswordConfirmRequestModel) {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.confirmResetPassword, dto));
  }

  validateAccount(email: string, password: string) {
    return lastValueFrom(this.client
      .send(MESSAGE_PATTERN.validateAccount, {email: email, password: password}));
  }

  loginWithFirebase(firebaseUserToken: string) {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.loginWithFirebase, firebaseUserToken))
  }
}
