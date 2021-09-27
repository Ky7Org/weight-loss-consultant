import { Module } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { CustomerModule } from './customer.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { TrainerModule } from './trainer.module';
import { JWT_CONFIG } from '../../constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './admin.module';
import { AccountModule } from './account.module';

@Module({
  imports: [
    CustomerModule,
    TrainerModule,
    AdminModule,
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: JWT_CONFIG.expireTime
        }
      }),
      inject: [ConfigService]
  })],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService]
})
export class AuthenticationModule {
}
