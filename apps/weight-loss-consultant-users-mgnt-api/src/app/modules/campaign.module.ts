import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {CampaignRepository} from '../repositories/campaign.repository';
import {CustomerRepository} from '../repositories/customer.repository';
import {CustomerService} from '../services/impl/customer.service.impl';
import {CampaignService} from '../services/impl/campaign.service.impl';
import {CampaignController} from '../controllers/campaign.controller';
import {RedisCacheModule} from "./redis-cache.module";


@Module({
  imports: [
    RedisCacheModule,
    TypeOrmModule.forFeature([CampaignRepository, CustomerRepository])],
  providers: [CampaignService, CustomerService],
  exports: [
    CampaignService, CustomerService
  ],
  controllers: [CampaignController]
})
export class CampaignModule {

}
