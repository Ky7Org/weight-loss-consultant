import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { logger } from '@nrwl/tao/src/shared/logger';
import { LoginRequestModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/login-request-model';
import { LoginResponseModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/login-response-model';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ResetPasswordRequestModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-request-model';
import { ResetPasswordConfirmRequestModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-confirm-request-model';
import { Public } from '../../auth/public-decorator';
import { LoginRequest } from '../../auth/login.req';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller(`/api/v1/auth`)
export class AuthenticationController {

  constructor(private readonly authenticationService: AuthenticationService) {
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Authentication account' })
  @ApiBody({
    type: LoginRequestModel,
    required: true,
    isArray: false
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseModel
  })
  async login(@Request() req, @Res() res) {
    const dto: LoginRequest = req.body;
    console.log(dto);
    try {
      const result = await this.authenticationService.login(dto);
      res.status(200).send(result);
    } catch (e) {
      logger.error(JSON.stringify(e));
      if (e.status === 'error') {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
      }
      res.status(e.status).send(e);
    }
  }


  @Post('reset-password')
  @Public()
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
  @Public()
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
