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
  imports: [],
  providers: [AppliedService],
  exports: [AppliedService],
  controllers: [ApplyController]
})

export class AppliedModule {

}
