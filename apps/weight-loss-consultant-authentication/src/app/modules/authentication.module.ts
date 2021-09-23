import { Module } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { CustomerModule } from './customer.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { TrainerModule } from './trainer.module';
import { jwtConfig } from '../../constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CustomerModule,
    TrainerModule,
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: jwtConfig.expireTime
        }
      }),
      inject: [ConfigService]
  })],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService]
})
export class AuthenticationModule {
}
