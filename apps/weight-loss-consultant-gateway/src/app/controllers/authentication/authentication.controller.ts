import {Body, Controller, Get, HttpStatus, Logger, Post, Request, Res, UseGuards} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {logger} from "@nrwl/tao/src/shared/logger";
import {LocalAuthGuard} from "../../../../../weight-loss-consultant-users-mgnt-api/src/app/auth/local-auth.guard";
import {LoginRequestModel} from "../../../../../weight-loss-consultant-authentication/src/app/models/login-request-model";
import {LoginResponseModel} from "../../../../../weight-loss-consultant-authentication/src/app/models/login-response-model";
import {CustomerDTO} from "../../../../../weight-loss-consultant-authentication/src/app/dtos/customer.dto";
import {TrainerDTO} from "../../../../../weight-loss-consultant-authentication/src/app/dtos/trainer.dto";
import {JwtAuthGuard} from "../../../../../weight-loss-consultant-authentication/src/app/guards/jwt-auth.guard";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ResetPasswordRequestModel} from "../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-request-model";
import {ResetPasswordConfirmRequestModel} from "../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-confirm-request-model";

@Controller()
export class AuthenticationController {

  private readonly logger = new Logger(AuthenticationController.name);

  constructor(private readonly authenticationService: AuthenticationService) {}


  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Authentication account' })
  @ApiBody({
    type: LoginRequestModel,
    required: true,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseModel
  })
  async login(@Request() req, @Res() res) {
    const dto: CustomerDTO | TrainerDTO = req.user;
    try {
      const result = await this.authenticationService.login(dto);
      res.status(200).send(result);
    } catch (e) {
      logger.error(e);
      res.status(e.status).end();
    }
  }

  @Post("reset-password")
  @ApiOperation({ summary: 'Reset password' })
  async resetPassword(@Body() body: ResetPasswordRequestModel, @Res() res) {
    try {
      const result = await this.authenticationService.resetPassword(body);
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      logger.log(e);
      res.status(e.status).end();
    }
  }

  @Post('reset-password/confirm')
  @ApiOperation({ summary: 'Confirm reset password' })
  async confirmChangePassword(@Body() body: ResetPasswordConfirmRequestModel, @Res() res) {
    try {
      const result = await this.authenticationService.confirmChangePassword(body);
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      logger.log(e);
      res.status(e.status).end();
    }
  }
}
