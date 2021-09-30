import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {LoginRequest} from "./login.req";
import {LoginResponse} from "./login.res";
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller('/v1/auth')
export class AuthController {

  constructor(private authService: AuthService) {}


  @ApiBody({
    type: LoginRequest
  })
  @ApiResponse({status: 200, description: 'Login successfully'})
  @ApiResponse({status: 401, description: 'Unauthorized.'})
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) : Promise<LoginResponse>{
    const dto: LoginRequest = req.user;
    return await this.authService.login(dto);
  }
}
