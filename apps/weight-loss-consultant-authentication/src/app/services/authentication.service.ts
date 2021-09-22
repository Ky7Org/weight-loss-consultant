import { Injectable, Logger } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtService } from '@nestjs/jwt';
import { TrainerService } from './trainer.service';
import { Role } from '../../constant';
import { CustomerEntity } from '../entities/customer.entity';
import { TrainerEntity } from '../entities/trainer.entity';
import { JwtRequestPayload } from '../models/jwt-request-payload';

@Injectable()
export class AuthenticationService{
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(private readonly customerService : CustomerService,
    private readonly trainerService: TrainerService,
    private readonly jwtService: JwtService) {
  }

  async validateAccount(email: string, password: string): Promise<any>{
    const customer = await this.customerService.findByEmail(email);
    if (customer && customer.password === password){
      const {password,  ...rest} = customer;
      rest["role"] = Role.customer;
      return rest;
    }
    const trainer = await this.trainerService.findByEmail(email);
    if (trainer && trainer.password === password){
      const {password, ...rest} = trainer;
      rest["role"] = Role.trainer;
      return rest;
    }
    return null;
  }

  async login(user: any){
    const payload = {
      fullname: user.fullname,
      email: user.email,
      role: user.role
    }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
