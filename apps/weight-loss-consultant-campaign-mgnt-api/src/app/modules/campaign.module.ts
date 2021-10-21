import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CampaignRepository } from '../repositories/campaign.repository';
import { CampaignMapper } from '../mappers/campaign.mapper';
import { CampaignController } from '../../../../weight-loss-consultant-campaign-mgnt-api/src/app/controllers/campaign.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT} from "../../../../../constant";
import {CampaignService} from "../services/campaign.service";


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
  // controllers: [CampaignController]
})
export class CampaignModule {

}
