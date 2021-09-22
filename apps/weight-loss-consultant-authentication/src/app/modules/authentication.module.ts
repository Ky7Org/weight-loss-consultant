import { Module } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { CustomerModule } from './customer.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { TrainerModule } from './trainer.module';
import { jwtConfig } from '../../constant';

@Module({
  imports: [
    CustomerModule,
    TrainerModule,
    PassportModule,
    JwtModule.register({
    secret: jwtConfig.secret,
    signOptions: {
      expiresIn: jwtConfig.expireTime
    }
  })],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService]
})
export class AuthenticationModule {
}
