import { Body, Controller, Get, Logger, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { CustomerService } from '../services/customer.service';
import { MailService } from '../services/mail.service';
import { ResetPasswordRequestModel } from '../models/reset-password-request-model';
import { generateOtp } from '../utils/otp-generator';
import { ResetPasswordTokenService } from '../services/reset-password-token.service';
import { ResetPasswordTokenEntity } from '../entities/reset-password-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordConfirmRequestModel } from '../models/reset-password-confirm-request-model';
import { ErrorResponseModel } from '../models/error-response-model';
import { AccountDTO } from '../dtos/acount.dto';
import { AccountService } from '../services/account.service';
import { RESET_PASSWORD_TOKEN_EXPIRED_TIME, Status } from '../../constant';
import { TrainerService } from '../services/trainer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LOGIN } from '../../../../weight-loss-consultant-gateway/src/app/services/authentication/authentication.service';
import { VALIDATE_AUTH_USER } from '../../../../weight-loss-consultant-gateway/src/app/auth/strategies/local.strategy';
import { LoginRequest } from '../../../../weight-loss-consultant-gateway/src/app/auth/login.req';
import { LoginResponse } from '../../../../weight-loss-consultant-gateway/src/app/auth/login.res';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private customerService: CustomerService,
              private trainerService: TrainerService,
              private readonly authenticationService: AuthenticationService,
              private readonly mailService: MailService,
              private readonly resetPasswordTokenService: ResetPasswordTokenService,
              private readonly accountService: AccountService) {
  }

  @MessagePattern({cmd: VALIDATE_AUTH_USER})
  async validateAuthenticatingUser(@Payload() payload) {
    return this.authenticationService.validateAccount(payload.email, payload.password);
  }

  @MessagePattern({cmd: LOGIN})
  async login(@Payload() credential: LoginRequest): Promise<LoginResponse> {
    return await this.authenticationService.login(credential);
  }

  @Post("reset-password")
  async resetPassword(@Body() requestModel: ResetPasswordRequestModel, @Res() response): Promise<void> {
    const email = requestModel.email;
    try {
      const tokenDTO = await this.resetPasswordTokenService.findLatestTokenByEmail(email);
      if (tokenDTO.expiredTime > new Date().getTime()) {
        return response.status(400).json(
          new ErrorResponseModel(400,
            `Cannot request OTP for this email 2 times in ${RESET_PASSWORD_TOKEN_EXPIRED_TIME.MINUTE} minutes`,
            'Bad request'));
      }
    } catch (e) {
      //if no token then continue
    }
    const otp = generateOtp();
    const tokenEntity = new ResetPasswordTokenEntity();
    tokenEntity.id = uuidv4();
    tokenEntity.email = requestModel.email;
    tokenEntity.otp = otp;
    tokenEntity.createdTime = new Date().getTime();
    tokenEntity.expiredTime = tokenEntity.createdTime + RESET_PASSWORD_TOKEN_EXPIRED_TIME.MILLISECOND;
    await this.resetPasswordTokenService.store(tokenEntity);
    await this.mailService.sendOTPEmail(requestModel.email, otp);
    return response.status(200).json();
  }

  @Post('reset-password/confirm')
  async confirmChangePassword(@Body() requestModel: ResetPasswordConfirmRequestModel, @Res() response): Promise<void> {
    try {
      const { email, otp, newPassword } = requestModel;
      const tokenDTO = await this.resetPasswordTokenService.findLatestTokenByEmail(email);
      if (tokenDTO.otp !== otp) {
        return response
          .status(400)
          .json(new ErrorResponseModel(400, 'Invalid otp', 'Bad request'));
      }
      if (tokenDTO.expiredTime < new Date().getTime() || tokenDTO.isInvalidated) {
        return response
          .status(400)
          .json(new ErrorResponseModel(400, 'OTP is expired', 'Bad request'));
      }
      const account: AccountDTO = await this.accountService.findAccountByEmail(email);
      if (account.status !== Status.ACTIVE){
        return response.status(400).json(new ErrorResponseModel(400, "This account is inactive", 'Bad request'));
      }
      this.accountService.updatePassword(account, newPassword);
      this.resetPasswordTokenService.update(tokenDTO.id, {isInvalidated: true})
      return response.status(200).json();
    } catch (e) {
      this.logger.error(e);
      return response.status(400).json(new ErrorResponseModel(400, e.message, 'Bad request'));
    }
  }
}
