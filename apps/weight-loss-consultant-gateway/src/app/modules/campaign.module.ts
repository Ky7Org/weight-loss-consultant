import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  HOST,
  USERS_MANAGEMENT_SERVICE_NAME,
  USERS_MANAGEMENT_SERVICE_PORT,
} from '../../../../../constant';
import { CampaignController } from '../controllers/campaigns-management/campaign.controller';
import { CampaignService } from '../services/campaign.service';


@Module({
  imports: [ClientsModule.register([
    {
      name: USERS_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: USERS_MANAGEMENT_SERVICE_PORT
      }
    }])
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService]
})
export class CampaignModule {
}
