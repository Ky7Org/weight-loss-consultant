import {TypeOrmModule} from "@nestjs/typeorm";
import {CustomerMapper} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/mappers/customer.mapper";
import {CustomerRepository} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/repositories/customer.repository";
import {CustomerService} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/services/impl/customer.service.impl";
import {CustomerController} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/controllers/customer.controller";
import {Module} from "@nestjs/common";
import {CampaignRepository} from "../repositories/campaign.repository";
import {CampaignService} from "../services/impls/campaign.service.impl";
import {CampaignMapper} from "../mappers/campaign.mapper";
import {CampaignController} from "../controllers/campaign.controller";


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
