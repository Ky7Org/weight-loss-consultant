import { Module } from '@nestjs/common';

import { AuthenticationController } from '../controllers/authentication/authentication.controller';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '../constant';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';


@Module({
  imports: [
    ClientsModule.register([
      {
        ...KAFKA_SERVICE,
        name: 'SERVER'
      }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: JWT_CONFIG.expireTime
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthenticationController],
  providers: [JwtStrategy, ConfigService, AuthenticationService],
  exports: [AuthenticationService]
})
export class AuthenticationModule {
}
