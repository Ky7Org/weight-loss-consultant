import {Body, Controller, HttpStatus, Logger, OnModuleInit, Post, Request, Res, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Public} from '../../decorators/public-decorator';
import {FirebaseAuthGuard} from '../../guards/firebase-auth.guard';
import {LoginResponseModel} from '../../models/login-response-model';
import {LoginRequestModel} from '../../models/login-request-model';
import {ResetPasswordRequestModel} from '../../models/reset-password-request-model';
import {ResetPasswordConfirmRequestModel} from '../../models/reset-password-confirm-request-model';
import {unwrapGRPCResponse} from "../../../../../common/utils";
import {Client, ClientGrpc} from "@nestjs/microservices";
import {AUTHENTICATION_GRPC_SERVICE} from "../../../../../common/grpc-services.route";
import {AuthenticationService} from "../../../../../common/proto-models/authentication.proto";
import {AUTHENTICATION} from "../../../../../common/api.routes";

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller(AUTHENTICATION.AUTH_API)
export class AuthenticationController implements OnModuleInit{

  @Client(AUTHENTICATION_GRPC_SERVICE)
  private readonly authenticationClient: ClientGrpc;

  private readonly logger = new Logger(AuthenticationController.name);

  private authenticationService: AuthenticationService;

  onModuleInit() {
    this.authenticationService = this.authenticationClient.getService<AuthenticationService>('AuthenticationService');
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
    try {
      const result = await unwrapGRPCResponse(this.authenticationService.login(req.body));
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
      //const result = await this.authenticationService.loginWithFirebase(req.user);
      res.status(HttpStatus.OK).send(null);
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
      //const result = await this.authenticationService.resetPassword(body);
      res.status(HttpStatus.OK).send(null);
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
     // const result = await this.authenticationService.confirmChangePassword(body);
      res.status(HttpStatus.OK).send(null);
    } catch ({ error }) {
      this.logger.log(error);
      res.status(error.statusCode).send(error);
    }
  }
}
