import {TypeOrmModule} from "@nestjs/typeorm";
import {CustomerMapper} from "../mappers/customer.mapper";
import {CustomerRepository} from "../repositories/customer.repository";
import {CustomerController} from "../controllers/customer.controller";
import {Module} from "@nestjs/common";
import {CustomerService} from "../services/impls/customer.service.impl";


@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerRepository,])],
  providers: [CustomerService, CustomerMapper],
  exports: [
    CustomerService, CustomerMapper
  ],
  controllers: [CustomerController]
})
export class CustomerModule {

}
