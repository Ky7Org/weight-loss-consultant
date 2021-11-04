import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CampaignMapper } from '../mappers/campaign.mapper';
import { ClientsModule } from '@nestjs/microservices';
import { CampaignService } from '../services/campaign.service';
import { CampaignController } from '../controllers/campaign.controller';
import { CampaignRepository } from '../repositories/campaign.repository';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';


@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignRepository]),
    ClientsModule.register([
      {
        ...KAFKA_SERVICE,
        name: 'SERVER',
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
