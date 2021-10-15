import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {BaseService} from "./base.service";
import {HeathInfoEntity} from "../entities/health-info.entity";
import {HealthRepository} from "../repositories/health-info.repository";
import {HealthInfoMapper} from "../mappers/health-info.mapper";
import {CustomerService} from "./impl/customer.service.impl";
import {CreateHealthInfoDto} from "../dtos/heath-info/create-health-info.dto";
import {UpdateHealthInfoDto} from "../dtos/heath-info/update-health-info.dto";

@Injectable()
export class HealthInfoService extends BaseService<HeathInfoEntity, HealthRepository> {
  constructor(repository: HealthRepository, private mapper: HealthInfoMapper, private customerService: CustomerService) {
    super(repository);
  }

  async findAll(): Promise<HeathInfoEntity[] | null> {
    return await this.repository.find();
  }

  async create(dto: CreateHealthInfoDto): Promise<HeathInfoEntity> {
    const custEmail = dto.customerEmail;
    const findCust = await this.customerService.findById(custEmail);
    if (findCust === undefined) {
      throw new NotFoundException(`Not found customer with email: ${custEmail}`)
    }
    const entity: HeathInfoEntity = await HealthInfoMapper.mapCreateHealthDtoToEntity(dto, findCust);
    return await this.repository.save(entity);
  }

  async edit(dto: UpdateHealthInfoDto, id: number): Promise<UpdateResult> {

    if (id != dto.id) {
      throw new ConflictException(`Param id: ${id} must match with id in request body: ${dto.id}`)
    }
    const customerEmail = dto.customerEmail;
    const cust = await this.customerService.findById(customerEmail);
    if (cust === undefined) {
      throw new NotFoundException(`Not found customer with email: ${customerEmail}`)
    }
    const existHealthInfo = await this.viewDetail(dto.id);
    if (existHealthInfo) {
      throw new NotFoundException(`Not found health info with id: ${id}`)
    }
    const entity: HeathInfoEntity = await HealthInfoMapper.mapUpdateHealthDtoToEntity(dto, cust);
    return await this.repository.update(id, entity);

  }

  async delete(id): Promise<DeleteResult> {
    const existHealthInfo = await this.viewDetail(id);
    if (existHealthInfo) {
      throw new NotFoundException(`Not found health info with id: ${id}`)
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id): Promise<HeathInfoEntity> {
    const query = this.repository.createQueryBuilder("health")
      .where("health.id = :id", {id: id})
      .leftJoinAndSelect("health.customer", "campaign")
      .getOne();
    return query;
  }

  async getHealthInfoDetailsWithCustomer(): Promise<HeathInfoEntity[] | null> {
    return await this.repository.find({relations: ["customer"]})
  }
}
