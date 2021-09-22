import { Controller, Get, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CustomerService } from '../services/customer.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CustomerDTO } from '../dtos/customer.dto';
import { TrainerDTO } from '../dtos/trainer.dto';

@Controller()
export class AppController{
  private readonly logger = new Logger(AppController.name);

  constructor(private customerService: CustomerService,
              private readonly authenticationService : AuthenticationService) {
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req): any{
    const dto : CustomerDTO | TrainerDTO = req.user;
    return this.authenticationService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("test/jwt")
  getAll(@Request() req ):any {
    return this.customerService.index();
  }
}
