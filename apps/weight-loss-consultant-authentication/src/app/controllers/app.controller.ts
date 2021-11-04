import { ClassSerializerInterceptor, Controller, HttpStatus, UseFilters, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { MailService } from '../services/mail.service';
import { ResetPasswordRequestModel } from '../models/reset-password-request-model';
import { generateOtp } from '../utils/otp-generator';
import { ResetPasswordTokenService } from '../services/reset-password-token.service';
import { ResetPasswordTokenEntity } from '../entities/reset-password-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordConfirmRequestModel } from '../models/reset-password-confirm-request-model';
import { AccountDTO } from '../dtos/acount.dto';
import { RESET_PASSWORD_TOKEN_EXPIRED_TIME, Status } from '../../constant';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from '../filters/rpc-exception.filter';
import { LoginRequest } from '../models/login.req';
import { LoginResponse } from '../models/login.res';
import { RpcExceptionModel } from '../filters/rpc-exception.model';
import { IKafkaMessage } from '../../../../common/kafka-message.model';
import { KAFKA_AUTHENTICATION_MESSAGE_PATTERN } from '../../../../common/kafka-utils';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {

  constructor(private readonly authenticationService: AuthenticationService,
              private readonly mailService: MailService,
              private readonly resetPasswordTokenService: ResetPasswordTokenService,) {
  }

  @MessagePattern(KAFKA_AUTHENTICATION_MESSAGE_PATTERN.login)
  @UseFilters(new ExceptionFilter())
  login(@Payload() message: IKafkaMessage<LoginRequest>): Promise<LoginResponse> {
    return this.authenticationService.login(message.value);
  }

  @MessagePattern(KAFKA_AUTHENTICATION_MESSAGE_PATTERN.loginWithFirebase)
  @UseFilters(new ExceptionFilter())
  loginWithFirebase(@Payload() firebaseUserToken: IKafkaMessage<string>) {
    return this.authenticationService.loginWithFirebase(firebaseUserToken.value);
  }

  @MessagePattern(KAFKA_AUTHENTICATION_MESSAGE_PATTERN.resetPassword)
  @UseFilters(new ExceptionFilter())
  async resetPassword(@Payload() requestModel: IKafkaMessage<ResetPasswordRequestModel>) {
    const email = requestModel.value.email;
    try {
      const tokenDTO = await this.resetPasswordTokenService.findLatestTokenByEmail(email);
      if (tokenDTO.expiredTime > new Date().getTime()) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Cannot request OTP for this email 2 times in ${RESET_PASSWORD_TOKEN_EXPIRED_TIME.MINUTE} minutes`
        } as RpcExceptionModel);
      }
    } catch (e) {
      //if no token then continue
    }
    const otp = generateOtp();
    const tokenEntity = new ResetPasswordTokenEntity();
    tokenEntity.id = uuidv4();
    tokenEntity.email = email;
    tokenEntity.otp = otp;
    tokenEntity.createdTime = new Date().getTime();
    tokenEntity.expiredTime = tokenEntity.createdTime + RESET_PASSWORD_TOKEN_EXPIRED_TIME.MILLISECOND;
    await this.resetPasswordTokenService.store(tokenEntity);
    await this.mailService.sendOTPEmail(email, otp);
  }

 @MessagePattern(KAFKA_AUTHENTICATION_MESSAGE_PATTERN.confirmResetPassword)
  @UseFilters(new ExceptionFilter())
  async confirmChangePassword(@Payload() requestModel: IKafkaMessage<ResetPasswordConfirmRequestModel>) {
    try {
      const {email, otp, newPassword} = requestModel.value;
      const tokenDTO = await this.resetPasswordTokenService.findLatestTokenByEmail(email);
      if (tokenDTO.otp !== otp) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid OTP'
        } as RpcExceptionModel);
      }
      if (tokenDTO.expiredTime < new Date().getTime() || tokenDTO.isInvalidated) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'OTP is expired'
        } as RpcExceptionModel);
      }
     // const account: AccountDTO = await this.accountService.findAccountByEmail(email);
      const account = {} as AccountDTO;
      if (account.status !== Status.ACTIVE) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'This account is inactivated'
        } as RpcExceptionModel);
      }
     // await this.accountService.updatePassword(account, newPassword);
      await this.resetPasswordTokenService.update(tokenDTO.id, {isInvalidated: true})
    } catch (e) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: e.message
      } as RpcExceptionModel);
    }
  }
}
