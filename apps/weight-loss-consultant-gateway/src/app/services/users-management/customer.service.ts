import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {Client, ClientKafka} from '@nestjs/microservices';
import {DeleteResult, UpdateResult} from 'typeorm';
import {CustomerEntity} from '../../entities/customer.entity';
import {UpdateCustDto} from '../../dtos/customer/update-customer-dto';
import {CreateCustDto} from '../../dtos/customer/create-customer.dto';
import {
  KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN,
  KAFKA_USERS_MANAGEMENT_SERVICE
} from "../../../../../common/kafka-utils"
import {lastValueFrom} from "rxjs";

@Injectable()
export class CustomerService implements OnModuleInit, OnModuleDestroy {

  @Client(KAFKA_USERS_MANAGEMENT_SERVICE)
  private readonly client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN.customers)) {
      this.client.subscribeToResponseOf(value);
    }
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  findAll(): Promise<CustomerEntity[]> {
    return lastValueFrom(this.client
      .send(MESSAGE_PATTERN.customers.getAllCustomers, ''));
  }

  viewDetail(email: string): Promise<CustomerEntity> {
    return lastValueFrom(this.client
      .send(MESSAGE_PATTERN.customers.getByEmail, email));
  }

  viewDetailSpecial(email: string): Promise<any> {
    return lastValueFrom(this.client
      .send(MESSAGE_PATTERN.customers.getSpecial, email));
  }

  delete(email): Promise<DeleteResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.customers.delete, email));
  }

  edit(email: string, dto: UpdateCustDto): Promise<UpdateResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.customers.update, {email, dto}));
  }

  create(dto: CreateCustDto): Promise<CustomerEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.customers.create, dto));
  }
}
