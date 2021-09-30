import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerService } from '../services/customer.service';
import { CustomerMapper } from '../mappers/customer.mapper';
import { RedisCacheModule } from './redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository])
    , RedisCacheModule
  ],
  providers: [CustomerService, CustomerMapper],
  exports: [CustomerService, CustomerMapper],
})
export class CustomerModule{}
