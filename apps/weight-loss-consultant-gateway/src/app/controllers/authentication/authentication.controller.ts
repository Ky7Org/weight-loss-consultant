import { Body, Controller, HttpStatus, Logger, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/login-request-model';
import { LoginResponseModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/login-response-model';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ResetPasswordRequestModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-request-model';
import { ResetPasswordConfirmRequestModel } from '../../../../../weight-loss-consultant-authentication/src/app/models/reset-password-confirm-request-model';
import { Public } from '../../auth/public-decorator';
import { LoginRequest } from '../../auth/login.req';
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller(`/v1/auth`)
export class AuthenticationController {

  private readonly logger = new Logger(AuthenticationController.name);

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
    try {
      const result = await this.authenticationService.login(dto);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Post('login/firebase')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Authentication account firebase' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseModel
  })
  async loginWithFirebase(@Request() req, @Res() res) {
    try {
      const result = await this.authenticationService.loginWithFirebase(req.user);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }


  @Post('reset-password')
  @Public()
  @ApiOperation({ summary: 'Reset password' })
  async resetPassword(@Body() body: ResetPasswordRequestModel, @Res() res) {
    try {
      const result = await this.authenticationService.resetPassword(body);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Post('reset-password/confirm')
  @Public()
  @ApiOperation({ summary: 'Confirm reset password' })
  async confirmChangePassword(@Body() body: ResetPasswordConfirmRequestModel, @Res() res) {
    try {
      const result = await this.authenticationService.confirmChangePassword(body);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.log(error);
      res.status(error.statusCode).send(error);
    }
  }
}
