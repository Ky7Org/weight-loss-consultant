import { Module } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { TrainerModule } from './trainer.module';
import { CustomerModule } from './customer.module';
import { AdminModule } from './admin.module';

@Module({
  imports: [TrainerModule, CustomerModule, AdminModule],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {

}
