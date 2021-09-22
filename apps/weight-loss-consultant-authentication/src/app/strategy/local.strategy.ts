import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CustomerEntity } from '../entities/customer.entity';
import { TrainerEntity } from '../entities/trainer.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authenticationService: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<CustomerEntity | TrainerEntity | null> {
    const user = await this.authenticationService.validateAccount(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
