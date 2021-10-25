import {HttpStatus, Injectable} from '@nestjs/common';
import {DeleteResult, UpdateResult} from 'typeorm';
import {CampaignEntity} from '../../entities/campaign.entity';
import {CampaignRepository} from '../../repositories/campaign.repository';
import {BaseService} from '../base.service';


@Injectable()
export class CampaignService extends BaseService<CampaignEntity, CampaignRepository> {
  constructor(repository: CampaignRepository) {
    super(repository);
  }

  async viewDetail(id): Promise<CampaignEntity> {
    return this.repository.createQueryBuilder("a")
      .where("a.id = :id", {id : id})
      .getOne();
  }

}
