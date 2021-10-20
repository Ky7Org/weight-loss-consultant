import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContractRepository} from "../repositories/health-info.repository";
import {ContractMapper} from "../mappers/health-info.mapper";
import {ContractService} from "../services/impls/contract.service";

import {ClientsModule, Transport} from "@nestjs/microservices";
import {
  CAMPAIGN_MANAGEMENT_SERVICE_NAME,
  CAMPAIGN_MANAGEMENT_SERVICE_PORT,
  HOST,
  PACKAGES_MANAGEMENT_SERVICE_NAME, PACKAGES_MANAGEMENT_SERVICE_PORT
} from "../../../../../constant";
import {ContractController} from "../controllers/contract.controller";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContractRepository
    ]),
    ClientsModule.register([
      {
        name: CAMPAIGN_MANAGEMENT_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: CAMPAIGN_MANAGEMENT_SERVICE_PORT
        }
      },
      {
        name: PACKAGES_MANAGEMENT_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: PACKAGES_MANAGEMENT_SERVICE_PORT
        }
      }
    ])
  ],
  providers: [
    ContractService, ContractMapper,
  ],
  exports: [
    ContractService, ContractMapper,
  ],
  controllers: [ContractController]
})

export class ContractModule {

}
