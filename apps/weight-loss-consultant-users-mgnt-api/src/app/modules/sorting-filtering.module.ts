import {AdminRepository} from '../repositories/admin.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {TrainerRepository} from '../repositories/trainer.repository';
import {CustomerRepository} from '../repositories/customer.repository';
import {SortingAndFilteringController} from '../controllers/sorting-filtering.controller';
import {SortingAndFilteringService} from '../services/sorting-filtering.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository, TrainerRepository, CustomerRepository])],
  providers:
    [ SortingAndFilteringService],
  exports: [
     SortingAndFilteringService
  ],
  controllers: [SortingAndFilteringController]
})
export class SortingAndFilteringModule {

}
