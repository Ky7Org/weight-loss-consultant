import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CampaignRepository } from '../repositories/campaign.repository';
import { CampaignService } from '../services/impls/campaign.service.impl';
import { CampaignMapper } from '../mappers/campaign.mapper';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerMapper } from '../mappers/customer.mapper';
import { CustomerService } from '../services/impls/customer.service.impl';


@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignRepository, CustomerRepository])],
  providers: [CampaignService, CampaignMapper, CustomerService, CustomerMapper],
  exports: [
    CampaignService, CampaignMapper, CustomerService, CustomerMapper
  ],
  controllers: []
})
export class CampaignModule {

}
