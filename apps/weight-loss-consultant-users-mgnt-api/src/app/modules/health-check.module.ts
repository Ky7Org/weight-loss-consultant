import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HealthRepository} from "../repositories/health-info.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {HealthInfoService} from "../services/health.service";
import {CustomerService} from "../services/impl/customer.service.impl";
import {HealthInfoMapper} from "../mappers/health-info.mapper";
import {CustomerMapper} from "../../../../common/mappers/customer.mapper";
import {RedisCacheModule} from "./redis-cache.module";
import {RedisCacheService} from "../services/redis-cache.service";


@Module({
  imports: [
    RedisCacheModule,
    TypeOrmModule.forFeature([HealthRepository
      , CustomerRepository
    ])],
  providers: [
    HealthInfoService
    , HealthInfoMapper
    , CustomerService
    , CustomerMapper,
  ],
  exports: [
    HealthInfoService
    , HealthInfoMapper,
  ],
  controllers: []
})

export class HealthCheckModule {

}
