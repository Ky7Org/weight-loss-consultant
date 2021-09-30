import {TypeOrmModule} from "@nestjs/typeorm";
import {CustomerMapper} from "../mappers/customer.mapper";
import {CustomerRepository} from "../repositories/customer.repository";
import {CustomerService} from "../services/impl/customer.service.impl";
import {CustomerController} from "../controllers/customer.controller";
import {Module} from "@nestjs/common";
import {CampaignRepository} from "../repositories/campaign.repository";
import {CampaignService} from "../services/impl/campaign.service.impl";
import {CampaignMapper} from "../mappers/campaign.mapper";
import {CampaignController} from "../controllers/campaign.controller";


@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignRepository,])],
  providers: [CampaignService, CampaignMapper],
  exports: [
    CampaignService, CampaignMapper
  ],
  controllers: [CampaignController]
})
export class CampaignModule {

}
