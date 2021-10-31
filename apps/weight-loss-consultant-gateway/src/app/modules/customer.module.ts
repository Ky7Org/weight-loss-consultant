import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT } from '../../../../../constant';
import { CustomerController } from '../controllers/users-management/customer.controller';
import { CustomerService } from '../services/users-management/customer.service';
import {KAFKA_USERS_MANAGEMENT_SERVICE} from "../../../../common/kafka-utils";


@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {
}
