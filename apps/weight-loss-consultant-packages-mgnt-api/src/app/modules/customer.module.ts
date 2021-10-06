import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerMapper } from '../mappers/customer.mapper';
import { CustomerRepository } from '../repositories/customer.repository';
import { Module } from '@nestjs/common';
import { CustomerService } from '../services/impls/customer.service.impl';


@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerRepository,])],
  providers: [CustomerService, CustomerMapper],
  exports: [
    CustomerService, CustomerMapper
  ],
  controllers: []
})
export class CustomerModule {

}
