import { Module } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../../constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {ClientsModule, Transport} from '@nestjs/microservices';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import {KAFKA_USERS_MANAGEMENT_SERVICE} from "../../../../common/kafka-utils";
import {v4 as uuid} from 'uuid';

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([
      {
        transport: Transport.KAFKA,
        name: 'SERVER',
        options: {
          client: {
            brokers: ['bangmaple.tech:9092'],
          },
          consumer: {
            groupId: `user.${uuid()}`,
          },
        },
      },
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
