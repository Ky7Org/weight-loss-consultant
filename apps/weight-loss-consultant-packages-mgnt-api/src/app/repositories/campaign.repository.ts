import {EntityRepository, Repository} from "typeorm";
import {CampaignEntity} from "../entities/campaign.entity";

@EntityRepository(CampaignEntity)
export class CampaignRepository extends Repository<CampaignEntity>{

}
