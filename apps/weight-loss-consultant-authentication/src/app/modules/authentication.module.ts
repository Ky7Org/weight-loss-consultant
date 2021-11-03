import { Module } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../../constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {ClientsModule, Transport} from '@nestjs/microservices';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import {KAFKA_SERVICE} from "../../../../common/kafka-utils";

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([
      {
        ...KAFKA_SERVICE,
        name: 'SERVER'
      }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: JWT_CONFIG.expireTime
        }
      }),
      inject: [ConfigService]
    })],
  providers: [AuthenticationService, FirebaseAuthService],
  exports: [AuthenticationService, FirebaseAuthService]
})
export class AuthenticationModule {
}
