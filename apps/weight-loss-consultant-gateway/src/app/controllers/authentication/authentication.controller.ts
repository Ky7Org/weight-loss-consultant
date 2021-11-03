import { Body, Controller, HttpStatus, Logger, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Public } from '../../decorators/public.decorator';
import { LoginResponseModel } from '../../models/login-response-model';
import { LoginRequestModel } from '../../models/login-request-model';
import { ResetPasswordRequestModel } from '../../models/reset-password-request-model';
import { ResetPasswordConfirmRequestModel } from '../../models/reset-password-confirm-request-model';
import { LoginRequest } from '../../models/login.req';
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
    } catch (error) {
      this.logger.error(JSON.stringify(error, null, 2));
      res.status(error.error.statusCode).send(error.error);
    }
  }

  @Post('login/firebase')
  @ApiOperation({ summary: 'Authentication account firebase' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseModel
  })
  async loginWithFirebase(@Request() req: Request, @Res() res) {
    try {
      const result = await this.authenticationService.loginWithFirebase(req.headers['authorization']);
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
