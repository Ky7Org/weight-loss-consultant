import { AdminRepository } from '../repositories/admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminService } from '../services/impl/admin.service.impl';
import { AdminController } from '../controllers/admin.controller';
import { RedisCacheModule } from './redis-cache.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRepository]),
    RedisCacheModule
  ],
  providers: [AdminService],
  exports: [
    AdminService
  ],
  controllers: [AdminController]
})
export class AdminModule {

}
