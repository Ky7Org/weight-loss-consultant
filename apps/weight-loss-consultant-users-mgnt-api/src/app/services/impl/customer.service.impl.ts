import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {BaseService} from "../base.service";
import {CustomerRepository} from "../../repositories/customer.repository";
import {CustomerEntity} from "../../entities/customer.entity";
import {EMAIL_EXISTED_ERR} from "../../constants/validation-err-message";
import {DeleteResult, Like, UpdateResult} from "typeorm";
import {CustomerMapper} from "../../mappers/customer.mapper";
import {CreateCustDto} from "../../dtos/customer/create-customer.dto";
import {UpdateCustDto} from "../../dtos/customer/update-customer-dto";

@Injectable()
export class CustomerService extends BaseService<CustomerEntity, CustomerRepository> {
  constructor(repository: CustomerRepository, private customerMapper: CustomerMapper) {
    super(repository);
  }

  async findAll(): Promise<CustomerEntity[] | null> {
    return await this.repository.find({
      relations: ["campaigns"],
    });
  }

  async create(dto: CreateCustDto): Promise<CustomerEntity | null> {
    const entity: CustomerEntity = await CustomerMapper.mapCreateCustDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new ConflictException(EMAIL_EXISTED_ERR);
    }
    return await this.repository.save(entity);
  }

  async edit(dto: UpdateCustDto, email : string): Promise<UpdateResult> {
    const entity: CustomerEntity = await CustomerMapper.mapUpdateCustDtoToEntity(dto);
    if (email !== entity.email) {
      throw new ConflictException(`Param: ${email} must match with ${entity.email} in request body`)
    }
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail === undefined) {
      throw new NotFoundException(`Not found customer with email : ${entity.email}`)
    }
    return await this.repository.update(entity.email, entity);
  }

  async delete(id): Promise<DeleteResult> {
    const existedCustomer = await this.repository.findOne(id);
    if (existedCustomer === undefined) {
      throw new NotFoundException(`Not found customer with email : ${existedCustomer.email}`)
    }
    return await this.repository.delete(id);
  }

  async findOneCustomer(id) : Promise<CustomerEntity> {
    return await this.repository.findOne(id);
  }

  async viewDetail(id): Promise<CustomerEntity[]> {
    return await this.repository.find({
      relations: ["campaigns"],
      where: [{
        email : `${id}`
      }]
    });
  }

  //testing
  async getAllCustomerWithCampaignDetail(): Promise<CustomerEntity[]> {
    const value = "c";
    const result = await this.repository.find(
      {
        select: ["email", "dob"],
        where:{
          email: Like(`%${value}%`)
        },
        relations: ["campaigns"],
        order: {
          dob: "ASC",
          email: "DESC",
        }
      }
    );
    return result;
  }


}
