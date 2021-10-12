import {Module} from '@nestjs/common';
import {AuthenticationService} from '../services/authentication.service';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ClientsModule} from '@nestjs/microservices';
import {USERS_MANAGEMENT_SERVICE_NAME} from '../../../../../constant';
import {USERS_MANAGEMENT_GRPC_SERVICE} from "../../../../common/grpc-services.route";
import { JWT_CONFIG } from '../../../../common/constants/jwt';

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([
      {
        name: USERS_MANAGEMENT_SERVICE_NAME,
        ...USERS_MANAGEMENT_GRPC_SERVICE
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
  providers: [AuthenticationService],
  exports: [AuthenticationService]
})
export class AuthenticationModule {
}
