import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt} from "passport-jwt";
import { Injectable, Logger } from '@nestjs/common';
import { jwtConfig } from '../../constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  private logger = new Logger(JwtStrategy.name);
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
    });

  }
  async validate(payload: any){
    this.logger.log(payload)

    return {
      name: payload.fullname,
      email: payload.email
    }
  }


}
