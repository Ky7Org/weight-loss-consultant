import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../../entities/customer.entity';
import { UpdateCustDto } from '../../dtos/customer/update-customer-dto';
import { CreateCustDto } from '../../dtos/customer/create-customer.dto';
import { UpdateAdminPayload } from '../../../../../common/dtos/update-without-password-and-status.payload';
import { KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../../common/kafka-utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomerService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private readonly client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN.customers)) {
      this.client.subscribeToResponseOf(value);
    }
    this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async findAll(): Promise<CustomerEntity[]> {
    return lastValueFrom<CustomerEntity[]>(this.client.send(MESSAGE_PATTERN.customers.getAllCustomers, ''));
  }

  async viewDetail(email: string): Promise<CustomerEntity> {
    return lastValueFrom<CustomerEntity>(this.client.send(MESSAGE_PATTERN.customers.getByEmail, email));
  }

  async viewDetailSpecial(email: string): Promise<any> {
    return lastValueFrom<CustomerEntity[]>(this.client.send(MESSAGE_PATTERN.customers.getSpecial, email));
  }


  async delete(email: string): Promise<DeleteResult> {
    return lastValueFrom<DeleteResult>(this.client.send(MESSAGE_PATTERN.customers.delete, email));
  }

  async edit(email: string, dto: UpdateCustDto): Promise<UpdateResult> {
    return lastValueFrom<UpdateResult>(this.client.send(MESSAGE_PATTERN.customers.update, {email, dto}));
  }

  async create(dto: CreateCustDto): Promise<CustomerEntity> {
    return lastValueFrom<CustomerEntity>(this.client.send(MESSAGE_PATTERN.customers.create, dto));
  }

  async updateWithoutPasswordAndStatus(payload: UpdateAdminPayload): Promise<UpdateResult> {
    return lastValueFrom<UpdateResult>(this.client.send(MESSAGE_PATTERN.customers.updateProfileWithoutPasswordAndStatus, payload));
  }
}
