import {HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from '../base.service';
import {CustomerRepository} from '../../repositories/customer.repository';
import {CustomerEntity} from '../../entities/customer.entity';
import {EMAIL_EXISTED_ERR} from '../../constants/validation-err-message';
import {DeleteResult, getManager, UpdateResult} from 'typeorm';
import {CustomerMapper} from '../../mappers/customer.mapper';
import {CreateCustDto} from '../../dtos/customer/create-customer.dto';
import {RpcException} from '@nestjs/microservices';
import {RpcExceptionModel} from '../../../../../common/filters/rpc-exception.model';
import {UpdateCustomerPayloadd} from "../../../../../common/dtos/update-without-password-and-status.payload";
import {UpdateCustomerPayload} from "../../controllers/customer.controller";


@Injectable()
export class CustomerService extends BaseService<CustomerEntity, CustomerRepository> {
  constructor(repository: CustomerRepository, private customerMapper: CustomerMapper) {
    super(repository);
  }

  async findAll(): Promise<CustomerEntity[] | undefined> {
    const query = this.repository.createQueryBuilder("customer")
      .leftJoinAndSelect("customer.campaigns", "campaign")
      .getMany();
    return query;
  }

  async create(dto: CreateCustDto): Promise<CustomerEntity> {
    const entity: CustomerEntity = await CustomerMapper.mapCreateCustDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: EMAIL_EXISTED_ERR
      } as RpcExceptionModel);
    }
    return this.repository.save<CustomerEntity>(entity);
  }

  async edit(payload: UpdateCustomerPayload): Promise<UpdateResult> {
    const entity: CustomerEntity = await CustomerMapper.mapUpdateCustDtoToEntity(payload.dto);
    const email = payload.email;
    if (email !== entity.email) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param: ${email} must match with ${entity.email} in request body`
      } as RpcExceptionModel);
    }
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email : ${entity.email}`
      } as RpcExceptionModel);
    }
    if (existedEmail.phone !== payload.dto.phone) {
      const customerPhone = await this.repository.createQueryBuilder("customer")
        .where("customer.phone = :phone", {phone : entity.phone})
        .getOne();
      if (customerPhone) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: `The phone number has been already registered, please choose another one.`
        } as RpcExceptionModel);
      }
    }
    return this.repository.update(entity.email, entity);
  }

  async delete(id): Promise<DeleteResult> {
    const existedCustomer = await this.repository.findOne(id);
    if (existedCustomer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email : ${id}`
      } as RpcExceptionModel);
    }
    return await this.repository.delete(id);
  }

  async findOneCustomer(id) : Promise<CustomerEntity> {
    return this.repository.findOne(id);
  }

  async viewDetail(id): Promise<CustomerEntity> {
    const query = this.repository.createQueryBuilder("customer")
      .where("customer.email = :email", {email : id})
      .leftJoinAndSelect("customer.campaigns", "campaign")
      .getOne();
    const sql = this.repository.createQueryBuilder("customer")
      .where("customer.email = :email", {email : id})
      .leftJoinAndSelect("customer.campaigns", "campaign")
      .getSql();
    console.log(sql)
    return query;
  }

  async viewOnlyCampaignsOfCustomer(customerEmail: string) : Promise<any>  {
    const entityManager = getManager();
    const query = entityManager.query(
    `SELECT \`campaign\`.\`id\`               AS \`id\`,
              \`campaign\`.\`description\`          AS \`description\`,
              \`campaign\`.\`status\`               AS \`status\`,
              \`campaign\`.\`startDate\`            AS \`startDate\`,
              \`campaign\`.\`endDate\`              AS \`endDate\`,
              \`campaign\`.\`feedback\`             AS \`feedback\`,
              \`campaign\`.\`targetWeight\`         AS \`targetWeight\`,
              \`campaign\`.\`currentWeight\`        AS \`currentWeight\`,
              \`campaign\`.\`spendTimeForTraining\` AS \`spendTimeForTraining\`,
              \`campaign\`.\`customerEmail\`        AS \`customerEmail\`
       FROM \`Customer\` \`customer\`
              LEFT JOIN \`Campaign\` \`campaign\` ON \`campaign\`.\`customerEmail\` = \`customer\`.\`email\`
              LEFT JOIN \`HealthInformation\` \`healthInfo\`
                        ON \`healthInfo\`.\`customerEmail\` = \`customer\`.\`email\`
       WHERE \`customer\`.\`email\` = ?
      `,[customerEmail]
    )
    return query;
  }

  async updateProfileWithoutPasswordAndStatus(payload : UpdateCustomerPayloadd) : Promise<UpdateResult> {
    if (payload.email !== payload.email) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param: ${payload.email} must match with request body email : ${payload.email} `
      } as RpcExceptionModel);
    }
    const result = await this.repository.createQueryBuilder("customer")
      .update(CustomerEntity)
      .set({
        fullname: payload.fullname,
        address: payload.address,
        phone: payload.phone,
        gender: payload.gender,
        profileImage : payload.profileImage,
        dob : payload.dob
      })
      .where("email = :email", {email : payload.email})
      .execute();
    return result;
  }

}
