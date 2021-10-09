import {AdminRepository} from '../repositories/admin.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {AdminService} from '../services/impl/admin.service.impl';
import {AdminController} from '../controllers/admin.controller';
import {TrainerService} from '../services/impl/trainer.service.impl';
import {CustomerService} from '../services/impl/customer.service.impl';
import {CustomerRepository} from '../repositories/customer.repository';
import {TrainerRepository} from '../repositories/trainer.repository';
import {RedisCacheModule} from './redis-cache.module';


@Module({
    imports: [
      TypeOrmModule.forFeature([CustomerRepository,]),
      TypeOrmModule.forFeature([AdminRepository,]),
      TypeOrmModule.forFeature([TrainerRepository,]),
      RedisCacheModule,
    ],
    providers: [AdminService, CustomerService, TrainerService],
    exports: [
      AdminService,
    ],
    controllers: [AdminController]
})
export class AdminModule {

}
