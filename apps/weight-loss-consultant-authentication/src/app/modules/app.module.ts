import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../../constant';
import { CustomerModule } from './customer.module';
import { AppController } from '../controllers/app.controller';
import { AuthenticationModule } from './authentication.module';
import { TrainerModule } from './trainer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    CustomerModule,
    AuthenticationModule,
    TrainerModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
