import { Module } from '@nestjs/common';
import { HealthCheckController } from '../controllers/health-info-management/health-check.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {
  HEALTH_MANAGEMENT_SERVICE_NAME, HEALTH_MANAGEMENT_SERVICE_PORT,
  HOST,
} from "../../../../../constant";
import {HealthInfoService} from "../services/health.service";

@Module({
  imports: [],
  providers: [HealthInfoService],
  exports: [HealthInfoService],
  controllers: [HealthCheckController]
})

export class HealthCheckModule {

}
