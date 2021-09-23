import { Injectable, Logger } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtService } from '@nestjs/jwt';
import { TrainerService } from './trainer.service';
import { Role } from '../../constant';
import { CustomerDTO } from '../dtos/customer.dto';
import { TrainerDTO } from '../dtos/trainer.dto';
import { AccountDTO } from '../dtos/acount.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(private readonly customerService: CustomerService,
              private readonly trainerService: TrainerService,
              private readonly jwtService: JwtService) {
  }

  async validateAccount(email: string, password: string): Promise<CustomerDTO | TrainerDTO | null> {
    const customerDTO: CustomerDTO = await this.customerService.findByEmail(email);
    if (customerDTO && customerDTO.password === password) {
      customerDTO['role'] = Role.customer;
      return customerDTO;
    }
    const trainerDTO: TrainerDTO = await this.trainerService.findByEmail(email);
    if (trainerDTO && trainerDTO.password === password) {
      trainerDTO['role'] = Role.trainer;
      return trainerDTO;
    }
    return null;
  }

  async login(user: AccountDTO) {
    const payload = {
      fullname: user.fullname,
      email: user.email,
      role: user.role
    };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
