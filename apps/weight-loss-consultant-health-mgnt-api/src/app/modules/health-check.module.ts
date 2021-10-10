import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HealthRepository} from "../repositories/health-info.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {HealthInfoService} from "../services/impls/health.service";
import {HealthInfoMapper} from "../mappers/health-info.mapper";
import {CustomerService} from "../services/impls/customer.service.impl";
import {CustomerMapper} from "../mappers/customer.mapper";
import {HealthCheckController} from "../controllers/health-info.controller";


@Module({
  imports: [
    TypeOrmModule.forFeature([HealthRepository, CustomerRepository])],
  providers: [HealthInfoService, HealthInfoMapper, CustomerService, CustomerMapper],
  exports: [
    HealthInfoService, HealthInfoMapper, CustomerService, CustomerMapper
  ],
  controllers: [HealthCheckController]
})

export class HealthCheckModule {

}
