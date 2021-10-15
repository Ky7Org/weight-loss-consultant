import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtStrategy} from '../../strategies/jwt.strategy';
import {ClientsModule} from '@nestjs/microservices';
import {AUTHENTICATION_SERVICE_NAME} from '../../../../../../constant';
import {PassportModule} from '@nestjs/passport';
import {AuthenticationController} from '../../controllers/authentication/authentication.controller';
import {AUTHENTICATION_GRPC_SERVICE} from "../../../../../common/grpc-services.route";
import { JWT_CONFIG } from '../../../../../common/constants/enums';

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([
      {
        name: AUTHENTICATION_SERVICE_NAME,
        ...AUTHENTICATION_GRPC_SERVICE,
      },]),
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

  providers: [JwtStrategy,  ConfigService],
  exports: [],
  controllers: [AuthenticationController]
})
export class AppJwtModule {
}
