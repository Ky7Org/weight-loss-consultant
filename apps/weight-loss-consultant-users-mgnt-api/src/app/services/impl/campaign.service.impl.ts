import {HttpStatus, Injectable} from '@nestjs/common';
import {DeleteResult, UpdateResult} from 'typeorm';
import {CampaignEntity} from '../../entities/campaign.entity';
import {CampaignRepository} from '../../repositories/campaign.repository';
import {CreateCampaignDto} from '../../dtos/campaign/create-campaign';
import {UpdateCampaignDto} from '../../dtos/campaign/update-campaign';
import {CustomerService} from './customer.service.impl';
import {RpcException} from '@nestjs/microservices';
import {RpcExceptionModel} from '../../../../../common/filters/rpc-exception.model';
import {CampaignMapper} from "../../../../../common/mappers/campaign.mapper";
import {BaseService} from "../../../../../common/services/base.service";

@Injectable()
export class CampaignService extends BaseService<CampaignEntity, CampaignRepository> {
  constructor(repository: CampaignRepository,
              private customerService: CustomerService) {
    super(repository);
  }

  async findAll(): Promise<CampaignEntity[] | null> {
    return await this.repository.find();
  }

  async create(dto: CreateCampaignDto): Promise<CampaignEntity> {
    return this.customerService.findById(dto.customerEmail)
      .then((findCust) => {
        if (findCust === undefined) {
          throw new RpcException({
            statusCode: HttpStatus.NOT_FOUND,
            message: `Not found customer with email: ${dto.customerEmail}`
          } as RpcExceptionModel);
        }
        return findCust;
      }).then((entity) => CampaignMapper.mapCreateCampaignDtoToEntity(dto, entity))
      .then((entity) => this.repository.save(entity));
  }

  async edit(dto: UpdateCampaignDto, id: number): Promise<UpdateResult> {
    if (id !== dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const customerEmail = dto.customerEmail;
    return this.customerService.findById(customerEmail)
      .then((cust) => {
        if (cust === undefined) {
          throw new RpcException({
            statusCode: HttpStatus.NOT_FOUND,
            message: `Not found customer with email: ${customerEmail}`
          } as RpcExceptionModel);
        }
        return cust;
      }).then((cust) => {
        return Promise.all([cust, this.viewDetail(dto.id)]);
      })
      .then((tuple) => {
        if (!tuple[1]) {
          throw new RpcException({
            statusCode: HttpStatus.NOT_FOUND,
            message: `Not found campaign with id: ${id}`
          } as RpcExceptionModel);
        }
        return CampaignMapper.mapUpdateCampaignDtoToEntity(dto, tuple[0]);
      }).then((entity) => this.repository.update(id, entity));
  }

  async delete(id): Promise<DeleteResult> {
    const existeCampaign = await this.viewDetail(id);
    if (!existeCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${id}`
      } as RpcExceptionModel);
    }
    return this.repository.delete(id);
  }

  async viewDetail(id): Promise<CampaignEntity> {
    return this.repository.findOne({
      relations: ['customer'],
      where: [{
        id: `${id}`
      }]
    });
  }

  async getCampaignDetailsWithCustomer(): Promise<CampaignEntity[]> {
    return this.repository.find({ relations: ['customer'] });
  }
}
