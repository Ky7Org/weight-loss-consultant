import { Body, Controller, Get, Logger, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CustomerService } from '../services/customer.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CustomerDTO } from '../dtos/customer.dto';
import { TrainerDTO } from '../dtos/trainer.dto';
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
import { Role } from '../../constant';
import { TrainerService } from '../services/trainer.service';


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

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req): any {
    const dto: CustomerDTO | TrainerDTO = req.user;
    return this.authenticationService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test/jwt')
  getAll(@Request() req): any {
    return this.customerService.index();
  }

  @Post("reset-password")
  async resetPassword(@Body() requestModel: ResetPasswordRequestModel, @Res() response): Promise<void> {
    const email = requestModel.email;
    try {
      const tokenDTO = await this.resetPasswordTokenService.findLatestTokenByEmail(email);
      if (tokenDTO.expiredTime > new Date().getTime()) {
        return response.status(400).json(
          new ErrorResponseModel(400,
            'Cannot request OTP for this email 2 times in 5 minutes',
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
    tokenEntity.expiredTime = tokenEntity.createdTime + 5 * 60 * 1000;
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
      this.accountService.updatePassword(account, newPassword);
      this.resetPasswordTokenService.update(tokenDTO.id, {isInvalidated: true})
      return response.status(200).json();
    } catch (e) {
      this.logger.error(e);
      return response.status(400).json(new ErrorResponseModel(400, e.message, 'Bad request'));
    }
  }
}