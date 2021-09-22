import { Injectable, Logger } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtService } from '@nestjs/jwt';
import { TrainerService } from './trainer.service';
import { Role } from '../../constant';
import { CustomerDTO } from '../dtos/customer.dto';
import { TrainerDTO } from '../dtos/trainer.dto';
import { AccountDTO } from '../dtos/acount.dto';
import { AdminDTO } from '../dtos/admin.dto';
import { AdminService } from './admin.service';
import { AccountService } from './account.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(private readonly accountService: AccountService,
              private readonly jwtService: JwtService) {
  }

  async validateAccount(email: string, password: string): Promise<AccountDTO | null> {

    const accountDTO = await this.accountService.findAccountByEmail(email);
    if (accountDTO && accountDTO.password === password) {
      return accountDTO;
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
