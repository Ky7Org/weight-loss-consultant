import {TypeOrmModule} from "@nestjs/typeorm";
import {CustomerMapper} from "../mappers/customer.mapper";
import {CustomerRepository} from "../repositories/customer.repository";
import {CustomerService} from "../services/impl/customer.service.impl";
import {CustomerController} from "../controllers/customer.controller";
import {Module} from "@nestjs/common";
import {AdminRepository} from "../repositories/admin.repository";
import {AdminService} from "../services/impl/admin.service.impl";
import {AdminMapper} from "../mappers/admin.mapper";
import {AdminController} from "../controllers/admin.controller";

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
