import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {DeleteResult, UpdateResult} from "typeorm";
import {CampaignEntity} from "../../entities/campaign.entity";
import {CampaignRepository} from "../../repositories/campaign.repository";
import {CampaignMapper} from "../../mappers/campaign.mapper";
import {CreateCampaignDto} from "../../dtos/campaign/create-campaign";
import {UpdateCampaignDto} from "../../dtos/campaign/update-campaign";
import {BaseService} from "../base.service";
import {CustomerService} from "./customer.service.impl";

@Injectable()
export class CampaignService extends BaseService<CampaignEntity, CampaignRepository> {
  constructor(repository: CampaignRepository, private campaignMapper: CampaignMapper, private customerService: CustomerService) {
    super(repository);
  }

  async findAll(): Promise<CampaignEntity[] | null> {
    return await this.repository.find();
  }

  async create(dto: CreateCampaignDto): Promise<CampaignEntity> {
    const custEmail = dto.customerEmail;
    const findCust = await this.customerService.findById(custEmail);
    if (findCust === undefined) {
      throw new NotFoundException(`Not found customer with email: ${custEmail}`)
    }
    const entity: CampaignEntity = await CampaignMapper.mapCreateCampaignDtoToEntity(dto, findCust);
    return await this.repository.save(entity);
  }

  async edit(dto: UpdateCampaignDto, id: number): Promise<UpdateResult> {

    if (id != dto.id) {
      throw new ConflictException(`Param id: ${id} must match with id in request body: ${dto.id}`)
    }
    const customerEmail = dto.customerEmail;
    const cust = await this.customerService.findById(customerEmail);
    if (cust === undefined) {
      throw new NotFoundException(`Not found customer with email: ${customerEmail}`)
    }
    const existeCampaign = await this.viewDetail(dto.id);
    if (existeCampaign.length === 0) {
      throw new NotFoundException(`Not found campaign with id: ${id}`)
    }
    const entity: CampaignEntity = await CampaignMapper.mapUpdateCampaignDtoToEntity(dto, cust);
    return await this.repository.update(id, entity);

  }

  async delete(id): Promise<DeleteResult> {
    const existeCampaign = await this.viewDetail(id);
    if (existeCampaign.length === 0) {
      throw new NotFoundException(`Not found campaign with id: ${id}`)
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id): Promise<CampaignEntity[]> {
    return await this.repository.find({
      relations: ["customer"],
      where: [{
        id: `${id}`
      }],
    })
  }

  async getCampaignDetailsWithCustomer(): Promise<CampaignEntity[] | null> {
    return await this.repository.find({relations: ["customer"]})
  }
}
