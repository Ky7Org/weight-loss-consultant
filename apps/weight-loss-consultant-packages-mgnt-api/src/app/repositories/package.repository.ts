import {EntityRepository, Repository} from "typeorm";
import {CampaignEntity} from "../entities/campaign.entity";
import {PackageEntity} from "../entities/package.enttiy";

@EntityRepository(PackageEntity)
export class PackageRepository extends Repository<PackageEntity>{

}
