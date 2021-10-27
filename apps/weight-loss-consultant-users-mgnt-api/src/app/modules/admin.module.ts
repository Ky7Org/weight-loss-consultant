import {AdminRepository} from '../repositories/admin.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {AdminService} from '../services/impl/admin.service.impl';
import {AdminMapper} from '../mappers/admin.mapper';
import {AdminController} from '../controllers/admin.controller';
import {TrainerService} from '../services/impl/trainer.service.impl';
import {CustomerService} from '../services/impl/customer.service.impl';
import {CustomerRepository} from '../repositories/customer.repository';
import {TrainerRepository} from '../repositories/trainer.repository';
import {CustomerMapper} from '../mappers/customer.mapper';
import {TrainerMapper} from '../mappers/trainer.mapper';
import { SortingAndFilteringService } from '../services/sorting-filtering.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerRepository,
      AdminRepository,
      TrainerRepository,
    ])],
  providers: [AdminService, AdminMapper, CustomerService,
    TrainerService, CustomerMapper, TrainerMapper,
    SortingAndFilteringService],
  exports: [
    AdminService, AdminMapper,
  ],
  controllers: [AdminController]
})
export class AdminModule {

}
