import { Module } from '@nestjs/common';

import { CampaignController } from '../controllers/campaigns-management/campaign.controller';
import { CampaignService } from '../services/campaign.service';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';


@Module({
  imports: [ClientsModule.register([
    {
      ...KAFKA_SERVICE,
      name: 'SERVER',
    }
  ]),],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService]
})
export class CampaignModule {
}
