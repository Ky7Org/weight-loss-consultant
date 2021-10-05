import {AdminRepository} from "../repositories/admin.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {AdminService} from "../services/impl/admin.service.impl";
import {AdminMapper} from "../mappers/admin.mapper";
import { AdminController } from "../controllers/admin.controller";
import {TrainerRepository} from "../repositories/trainer.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {TrainerService} from "../services/impl/trainer.service.impl";
import {TrainerMapper} from "../mappers/trainer.mapper";
import {CustomerService} from "../services/impl/customer.service.impl";
import {CustomerMapper} from "../mappers/customer.mapper";
import {SortingAndFilteringController} from "../controllers/sorting-filtering.controller";
import {SortingAndFilteringService} from "../services/sorting-filtering.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository, TrainerRepository, CustomerRepository])],
  providers:
    [AdminService, AdminMapper, TrainerService, TrainerMapper, CustomerService, CustomerMapper, SortingAndFilteringService],
  exports: [
    AdminService, AdminMapper, TrainerService, TrainerMapper, CustomerService, CustomerMapper, SortingAndFilteringService
  ],
  controllers: [SortingAndFilteringController]
})
export class SortingAndFilteringModule {

}
