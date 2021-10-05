import { Module } from '@nestjs/common';
import { PackageController } from '../controllers/package.controller';
import { PackageService } from '../services/package.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTHENTICATION_SERVICE_NAME,
  AUTHENTICATION_SERVICE_PORT,
  HOST,
  USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT
} from '../../../../../constant';


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
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService]
})
export class PackageModule {
}
