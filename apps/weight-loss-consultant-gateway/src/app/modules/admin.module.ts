import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT } from '../../../../../constant';
import { AdminController } from '../controllers/users-management/admin.controller';
import { AdminService } from '../services/admin.service';
import {KAFKA_USERS_MANAGEMENT_SERVICE} from "../../../../common/kafka-utils";


@Module({
  imports: [ClientsModule.register([KAFKA_USERS_MANAGEMENT_SERVICE])
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {
}
