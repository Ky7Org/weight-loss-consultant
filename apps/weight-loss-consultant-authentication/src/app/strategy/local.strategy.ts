import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { TrainerDTO } from '../dtos/trainer.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authenticationService: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<CustomerDTO | TrainerDTO | null> {
    const user = await this.authenticationService.validateAccount(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
