import { Module } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from './customer.module';
import { JwtModule } from '@nestjs/jwt';
import { TrainerModule } from './trainer.module';
import { JWT_CONFIG } from '../../constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './admin.module';
import { AccountModule } from './account.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT } from '../../../../../constant';

@Module({
  imports: [
    CustomerModule,
    TrainerModule,
    AdminModule,
    AccountModule,
    PassportModule,
    ClientsModule.register([
      {
        name: USERS_MANAGEMENT_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: USERS_MANAGEMENT_SERVICE_PORT
        }
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
