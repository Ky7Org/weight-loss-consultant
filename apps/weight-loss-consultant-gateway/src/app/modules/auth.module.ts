import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_SERVICE_NAME, AUTHENTICATION_SERVICE_PORT, HOST } from '../../../../../constant';
import { AuthenticationController } from '../controllers/authentication/authentication.controller';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '../constant';
import { JwtStrategy } from '../strategies/jwt.strategy';


@Module({
  imports: [ClientsModule.register([
    {
      name: AUTHENTICATION_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: AUTHENTICATION_SERVICE_PORT,
      }
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
