import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HealthRepository} from "../repositories/health-info.repository";
import {HealthInfoService} from "../services/impls/health.service";
import {HealthInfoMapper} from "../mappers/health-info.mapper";
import {CustomerService} from "../services/impls/customer.service.impl";
import {CustomerMapper} from "../mappers/customer.mapper";
import {HealthCheckController} from "../controllers/health-info.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT} from "../../../../../constant";


@Module({
  imports: [
    TypeOrmModule.forFeature([HealthRepository]),
    ClientsModule.register([
      {
        name: USERS_MANAGEMENT_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: USERS_MANAGEMENT_SERVICE_PORT
        }
      }
    ])
  ],
  providers: [HealthInfoService, HealthInfoMapper],
  exports: [
    HealthInfoService, HealthInfoMapper
  ],
  controllers: [HealthCheckController]
})

export class HealthCheckModule {

}
