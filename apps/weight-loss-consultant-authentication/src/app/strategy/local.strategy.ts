import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authenticationService: AuthenticationService) {
    super({usernameField: "email"});
  }

  async validate(email:string, password: string): Promise<any>{
    const user = await this.authenticationService.validateAccount(email, password);
    this.logger.log(user);
    if (!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}
