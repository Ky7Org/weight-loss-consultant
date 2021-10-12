import { AdminRepository } from '../repositories/admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminService } from '../services/impl/admin.service.impl';
import { AdminController } from '../controllers/admin.controller';
import { TrainerService } from '../services/impl/trainer.service.impl';
import { CustomerService } from '../services/impl/customer.service.impl';
import { CustomerRepository } from '../repositories/customer.repository';
import { TrainerRepository } from '../repositories/trainer.repository';
import { RedisCacheModule } from './redis-cache.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';


@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository]),
    RedisCacheModule,
    AutomapperModule.forRoot({
      options: [{ name: 'classMapper', pluginInitializer: classes }],
      singular: true
    })
  ],
  providers: [AdminService],
  exports: [
    AdminService
  ],
  controllers: [AdminController]
})
export class AdminModule {

}
