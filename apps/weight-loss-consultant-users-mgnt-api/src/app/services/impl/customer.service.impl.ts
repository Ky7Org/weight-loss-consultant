import {ConflictException, Injectable} from "@nestjs/common";
import {BaseService} from "../base.service";
import {CustomerRepository} from "../../repositories/customer.repository";
import {CustomerEntity} from "../../entities/customer.entity";
import {TrainerRepository} from "../../repositories/trainer.repository";
import {TrainerMapper} from "../../mappers/trainer.mapper";
import {TrainerEntity} from "../../entities/trainer.entity";
import {CreateTrainerDto} from "../../dtos/trainer/create-trainer";
import {EMAIL_EXISTED_ERR} from "../../constants/validation-err-message";
import {UpdateTrainerDto} from "../../dtos/trainer/update-trainer";
import {DeleteResult, UpdateResult} from "typeorm";
import {CustomerMapper} from "../../mappers/customer.mapper";
import {CreateCustDto} from "../../dtos/customer/create-customer.dto";
import {UpdateCustDto} from "../../dtos/customer/update-customer-dto";

@Injectable()
export class CustomerService extends BaseService<CustomerEntity, CustomerRepository> {
  constructor(repository: CustomerRepository, private customerMapper: CustomerMapper){
    super(repository);
  }

  async findAll() : Promise<CustomerEntity[] | null>{
    return await this.repository.find();
  }

  async create(dto: CreateCustDto) : Promise<CustomerEntity | null> {
    const entity : CustomerEntity  = await CustomerMapper.mapCreateCustDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new ConflictException(EMAIL_EXISTED_ERR);
    }
    return await this.repository.save(entity);
  }

  async edit(dto : UpdateCustDto) : Promise<UpdateResult> {
    const entity : CustomerEntity = await CustomerMapper.mapUpdateCustDtoToEntity(dto);
    return await this.repository.update(entity.email, entity );
  }

  async delete(id) : Promise<DeleteResult>{
    return await this.repository.delete(id);
  }

  async viewDetail(id) : Promise<CustomerEntity | null>{
    return await this.repository.findOne(id);
  }
}
