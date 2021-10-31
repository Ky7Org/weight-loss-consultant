import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";


import {ClientsModule, Transport} from "@nestjs/microservices";
import {
  CAMPAIGN_MANAGEMENT_SERVICE_NAME,
  CAMPAIGN_MANAGEMENT_SERVICE_PORT, CONTRACT_MANAGEMENT_SERVICE_NAME, CONTRACT_MANAGEMENT_SERVICE_PORT,
  HOST,
  PACKAGES_MANAGEMENT_SERVICE_NAME, PACKAGES_MANAGEMENT_SERVICE_PORT
} from "../../../../../constant";
import {AppliedRepository} from "../repositories/applied.repository";
import {AppliedService} from "../services/applied.service";
import {AppliedMapper} from "../mappers/applied.mapper";
import {AppliedController} from "../controllers/applied.controller";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppliedRepository
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
      },
      {
        name: CONTRACT_MANAGEMENT_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: CONTRACT_MANAGEMENT_SERVICE_PORT
        }
      }
    ])
  ],
  providers: [
    AppliedService, AppliedMapper,
  ],
  exports: [
    AppliedService, AppliedMapper,
  ],
  controllers: [AppliedController]
})

export class AppliedModule {

}
