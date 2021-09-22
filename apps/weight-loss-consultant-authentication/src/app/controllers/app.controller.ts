import { Controller, Get, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CustomerService } from '../services/customer.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller()
export class AppController{
  private readonly logger = new Logger(AppController.name);

  constructor(private customerService: CustomerService,
              private readonly authenticationService : AuthenticationService) {
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req): any{
    return this.authenticationService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("test/jwt")
  getAll():any {
    return this.customerService.index();
  }
}
