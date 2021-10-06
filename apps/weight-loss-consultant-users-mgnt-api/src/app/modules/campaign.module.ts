import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CampaignRepository } from '../repositories/campaign.repository';
import { CampaignMapper } from '../mappers/campaign.mapper';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerMapper } from '../mappers/customer.mapper';
import { CustomerService } from '../services/impl/customer.service.impl';
import { CampaignService } from '../services/impl/campaign.service.impl';
import { CampaignController } from '../controllers/campaign.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignRepository, CustomerRepository])],
  providers: [CampaignService, CampaignMapper, CustomerService, CustomerMapper],
  exports: [
    CampaignService, CampaignMapper, CustomerService, CustomerMapper
  ],
  controllers: [CampaignController]
})
export class CampaignModule {

}
