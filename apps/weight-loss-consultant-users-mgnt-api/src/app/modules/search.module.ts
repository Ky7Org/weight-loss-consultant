import {AdminRepository} from '../repositories/admin.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {TrainerRepository} from '../repositories/trainer.repository';
import {CustomerRepository} from '../repositories/customer.repository';
import {SearchService} from '../services/search.service';
import {SearchController} from '../controllers/search.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository, TrainerRepository, CustomerRepository])],
  providers:
    [ SearchService],
  exports: [
     SearchService
  ],
  controllers: [SearchController]
})
export class SearchModule {

}
