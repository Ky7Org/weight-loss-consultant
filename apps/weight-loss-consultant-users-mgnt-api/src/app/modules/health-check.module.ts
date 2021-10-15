import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HealthRepository} from "../repositories/health-info.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {CustomerMapper} from "../mappers/customer.mapper";
import {HealthInfoService} from "../services/health.service";
import {CustomerService} from "../services/impl/customer.service.impl";
import {HealthInfoMapper} from "../mappers/health-info.mapper";


@Module({
  imports: [
    TypeOrmModule.forFeature([HealthRepository
      , CustomerRepository
    ])],
  providers: [
    HealthInfoService
    , HealthInfoMapper
    , CustomerService
    , CustomerMapper
  ],
  exports: [
    HealthInfoService
    , HealthInfoMapper
  ],
  controllers: []
})

export class HealthCheckModule {

}
