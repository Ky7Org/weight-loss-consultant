import {ConflictException, Injectable} from "@nestjs/common";
import {BaseService} from "../base.service";
import {DeleteResult, getConnection, UpdateResult} from "typeorm";
import {CampaignEntity} from "../../entities/campaign.entity";
import {CampaignRepository} from "../../repositories/campaign.repository";
import {CampaignMapper} from "../../mappers/campaign.mapper";
import {CreateCampaignDto} from "../../dtos/campaign/create-campaign";
import {UpdateCampaignDto} from "../../dtos/campaign/update-campaign";

@Injectable()
export class CampaignService extends BaseService<CampaignEntity, CampaignRepository> {
  constructor(repository: CampaignRepository, private campaignMapper: CampaignMapper){
    super(repository);
  }

  async findAll() : Promise<CampaignEntity[] | null>{
    return await this.repository.find();
  }

  async create(dto: CreateCampaignDto) : Promise<any> {
    const entity : CampaignEntity  = await CampaignMapper.mapCreateCampaignDtoToEntity(dto);
    return await this.repository.save(entity);
    // await getConnection()
    //   .createQueryBuilder()
    //   .insert()
    //   .into(CampaignEntity)
    //   .values([
    //
    //   ])
  }

  async edit(dto : UpdateCampaignDto) : Promise<UpdateResult> {
    const entity : CampaignEntity = await CampaignMapper.mapUpdateCampaignDtoToEntity(dto);
    return await this.repository.update(entity.id, entity );
  }

  async delete(id) : Promise<DeleteResult>{
    return await this.repository.delete(id);
  }

  async viewDetail(id) : Promise<any>{
    return await this.repository.find({
      relations: ["customer"],
      where: [{
        id: `${id}`
      }],
    })
  }

  async getCampaignDetailsWithCustomer() : Promise<CampaignEntity[] | null>{
    return await this.repository.find({relations: ["customer"]})
  }
}
