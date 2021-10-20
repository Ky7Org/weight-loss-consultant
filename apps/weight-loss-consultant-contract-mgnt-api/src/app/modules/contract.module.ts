import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContractRepository} from "../repositories/health-info.repository";
import {ContractMapper} from "../mappers/health-info.mapper";
import {CampaignRepository} from "../repositories/campaign.repository";
import { PackageRepository } from '../repositories/package.repository';
import {ContractService} from "../services/impls/contract.service";
import {CampaignService} from "../services/impls/campaign.service.impl";
import {PackageService} from "../services/impls/package.service.impl";
import {ContractController} from "../controllers/contract.controller";
import {Connection} from "typeorm";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {
  CAMPAIGN_MANAGEMENT_SERVICE_NAME,
  CAMPAIGN_MANAGEMENT_SERVICE_PORT,
  HOST,
  PACKAGES_MANAGEMENT_SERVICE_NAME, PACKAGES_MANAGEMENT_SERVICE_PORT
} from "../../../../../constant";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      // CampaignRepository,
      // PackageRepository,
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
    // CampaignService,
    // PackageService
  ],
  exports: [
    ContractService, ContractMapper,
    // CampaignService, PackageService
  ],
  // controllers: [ContractController]
})

export class ContractModule {

}
