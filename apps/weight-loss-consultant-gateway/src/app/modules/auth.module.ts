import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTHENTICATION_SERVICE_NAME,
  AUTHENTICATION_SERVICE_PORT,
  HOST,
} from '../../../../../constant';
import { AuthenticationController } from '../controllers/authentication/authentication.controller';
import { AuthenticationService } from '../services/authentication/authentication.service';


@Module({
  imports: [ClientsModule.register([
    {
      name: AUTHENTICATION_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: AUTHENTICATION_SERVICE_PORT,
      }
    }])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService]
})
export class AuthenticationModule {
}
