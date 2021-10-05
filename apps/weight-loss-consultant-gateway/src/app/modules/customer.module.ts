import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  HOST,
  USERS_MANAGEMENT_SERVICE_NAME,
  USERS_MANAGEMENT_SERVICE_PORT,
} from '../../../../../constant';
import { AuthenticationController } from '../controllers/authentication/authentication.controller';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { CustomerController } from '../controllers/users-management/customer.controller';
import { CustomerService } from '../services/customer.service';


@Module({
  imports: [ClientsModule.register([
    {
      name: USERS_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: USERS_MANAGEMENT_SERVICE_PORT
      }
    }])
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {
}
