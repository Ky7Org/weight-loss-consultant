import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CampaignMapper } from '../mappers/campaign.mapper';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT} from "../../../../../constant";
import {CampaignService} from "../services/campaign.service";
import {CampaignController} from "../controllers/campaign.controller";
import {CampaignRepository} from "../repositories/campaign.repository";


@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignRepository]),
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
  providers: [CampaignService, CampaignMapper],
  exports: [
    CampaignService, CampaignMapper
  ],
  controllers: [CampaignController]
})
export class CampaignModule {

}
