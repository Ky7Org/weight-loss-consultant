import {TypeOrmModule} from '@nestjs/typeorm';
import {CustomerRepository} from '../repositories/customer.repository';
import {CustomerService} from '../services/impl/customer.service.impl';
import {CustomerController} from '../controllers/customer.controller';
import {Module} from '@nestjs/common';
import {RedisCacheModule} from "./redis-cache.module";

@Module({
  imports: [
    RedisCacheModule,
    TypeOrmModule.forFeature([CustomerRepository,])],
  providers: [CustomerService],
  exports: [
    CustomerService
  ],
  controllers: [CustomerController]
})
export class CustomerModule {

}
