import { Module } from '@nestjs/common';
import { TrainerController } from '../controllers/users-management/trainer.controller';
import { TrainerService } from '../services/users-management/trainer.service';
import { AdminController } from '../controllers/users-management/admin.controller';
import { CustomerController } from '../controllers/users-management/customer.controller';
import { CustomerService } from '../services/users-management/customer.service';
import { AdminService } from '../services/users-management/admin.service';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';

@Module({
  imports: [
    ClientsModule.register([
    {
      ...KAFKA_SERVICE,
      name: 'SERVER'
    }
  ]),],
  controllers: [
    AdminController,
    TrainerController,
    CustomerController,
  ],
  providers: [
    AdminService,
    TrainerService,
    CustomerService,
  ],
  exports: [
    AdminService,
    TrainerService,
    CustomerService,
  ]
})
export class UsersManagementModule {}
