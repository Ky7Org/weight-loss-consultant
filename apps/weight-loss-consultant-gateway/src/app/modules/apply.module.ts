import { Module } from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {
  APPLIED_MANAGEMENT_SERVICE_NAME,
  APPLIED_MANAGEMENT_SERVICE_PORT,
  HOST,
} from "../../../../../constant";
import {AppliedService} from "../services/applied.service";
import {ApplyController} from "../controllers/applies-management/apply.controller";

@Module({
  imports: [ClientsModule.register([
    {
      name: APPLIED_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: APPLIED_MANAGEMENT_SERVICE_PORT
      }
    }])
  ],
  providers: [AppliedService],
  exports: [AppliedService],
  controllers: [ApplyController]
})

export class AppliedModule {

}
