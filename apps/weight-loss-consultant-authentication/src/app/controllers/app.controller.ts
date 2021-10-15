import {
  Controller,
  HttpStatus,
  UseFilters
} from '@nestjs/common';
import {AuthenticationService} from '../services/authentication.service';
import {MailService} from '../services/mail.service';
import {generateOtp} from '../utils/otp-generator';
import {ResetPasswordTokenService} from '../services/reset-password-token.service';
import {ResetPasswordTokenEntity} from '../entities/reset-password-token.entity';
import {v4 as uuidv4} from 'uuid';
import {
  GrpcMethod,
  MessagePattern,
  Payload,
  RpcException
} from '@nestjs/microservices';
import {
  CONFIRM_CHANGE_PASSWORD,
  GOOGLE_FIREBASE_AUTHENTICATE_USER,
  RESET_PASSWORD
} from '../../../../common/routes/authentication-routes';
import {
  GRPC_AUTHENTICATION_SERVICE
} from "../../../../common/authentication-route.grpc";
import {constructGRPCResponse} from "../../../../common/utils";
import {RpcExceptionModel} from "../../../../common/filters/rpc-exception.model";
import {ExceptionFilter} from "../../../../common/filters/rpc-exception.filter";
import { RESET_PASSWORD_TOKEN_EXPIRED_TIME } from '../../../../common/constants/jwt';
import { LoginRequest } from '../../../../common/dtos/authentication/login.req.dto';
import { ResetPasswordConfirmRequestDto } from '../../../../common/dtos/authentication/reset-password-confirm-request.dto';

@Controller()
export class AppController {

  constructor(private readonly authenticationService: AuthenticationService,
              private readonly mailService: MailService,
              private readonly resetPasswordTokenService: ResetPasswordTokenService) {
  }

  @GrpcMethod(GRPC_AUTHENTICATION_SERVICE)
  @UseFilters(new ExceptionFilter())
  login(credential: LoginRequest) {
    return constructGRPCResponse(this.authenticationService.login(credential));
  }

  @MessagePattern({cmd: GOOGLE_FIREBASE_AUTHENTICATE_USER})
  @UseFilters(new ExceptionFilter())
  async loginWithFirebase(@Payload() firebaseUserToken: string) {
    return this.authenticationService.loginWithFirebase(firebaseUserToken);
  }

  @MessagePattern({cmd: RESET_PASSWORD})
  @UseFilters(new ExceptionFilter())
  async resetPassword(@Payload() requestModel: ResetPasswordConfirmRequestDto) {
    const email = requestModel.email;
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
    tokenEntity.email = requestModel.email;
    tokenEntity.otp = otp;
    tokenEntity.createdTime = new Date().getTime();
    tokenEntity.expiredTime = tokenEntity.createdTime + RESET_PASSWORD_TOKEN_EXPIRED_TIME.MILLISECOND;
    await this.resetPasswordTokenService.store(tokenEntity);
    await this.mailService.sendOTPEmail(requestModel.email, otp);
  }

  @MessagePattern({cmd: CONFIRM_CHANGE_PASSWORD})
  @UseFilters(new ExceptionFilter())
  async confirmChangePassword(@Payload() requestModel: ResetPasswordConfirmRequestDto) {
   /* try {
      const { email, otp, newPassword } = requestModel;
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
      const account: AccountDTO = await this.accountService.findAccountByEmail(email);
      if (account.status !== Status.ACTIVE){
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'This account is inactivated'
        } as RpcExceptionModel);
      }
      this.accountService.updatePassword(account, newPassword);
      this.resetPasswordTokenService.update(tokenDTO.id, {isInvalidated: true})
    } catch (e) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: e.message
      } as RpcExceptionModel);
    }*/
  }
}
