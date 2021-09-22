import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerService } from '../services/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository])],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule{}
