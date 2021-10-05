import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  HOST,
  USERS_MANAGEMENT_SERVICE_NAME,
  USERS_MANAGEMENT_SERVICE_PORT,
} from '../../../../../constant';
import { AdminController } from '../controllers/users-management/admin.controller';
import { AdminService } from '../services/admin.service';


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
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {
}
