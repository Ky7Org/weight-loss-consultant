import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  CAMPAIGN_MANAGEMENT_SERVICE_NAME, CAMPAIGN_MANAGEMENT_SERVICE_PORT,
  HOST,
} from '../../../../../constant';
import { CampaignController } from '../controllers/campaigns-management/campaign.controller';
import { CampaignService } from '../services/campaign.service';


@Module({
  imports: [ClientsModule.register([
    {
      name: CAMPAIGN_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: CAMPAIGN_MANAGEMENT_SERVICE_PORT
      }
    }])
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService]
})
export class CampaignModule {
}
