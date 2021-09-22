import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerService } from '../services/customer.service';
import { CustomerMapper } from '../mappers/customer.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository])],
  providers: [CustomerService, CustomerMapper],
  exports: [CustomerService, CustomerMapper],
})
export class CustomerModule{}
