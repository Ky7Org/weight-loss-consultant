import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Status } from '../../constant';
import { AccountDTO } from '../dtos/acount.dto';
import { AccountService } from './account.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(private readonly accountService: AccountService,
              private readonly jwtService: JwtService) {
  }

  async validateAccount(email: string, password: string): Promise<AccountDTO | null> {

    const accountDTO = await this.accountService.findAccountByEmail(email);
    if (accountDTO && accountDTO.password === password && accountDTO.status === Status.ACTIVE) {
      return accountDTO;
    }
    return null;
  }

  async login(user: AccountDTO) {
    const payload = {
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      profileImage : user.profileImage,
    };
    const token = this.jwtService.sign(payload);
    const decodeInfo = this.jwtService.decode(this.jwtService.sign(payload));
    return {
      accessToken: token,
      decodeInfo
    };
  }
}
