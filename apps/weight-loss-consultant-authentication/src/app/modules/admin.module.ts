import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from '../services/admin.service';
import { AdminMapper } from '../mappers/admin.mapper';
import { AdminRepository } from '../repositories/admin.repository';
import { RedisCacheModule } from './redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])
    , RedisCacheModule
  ],
  providers: [AdminService, AdminMapper],
  exports: [AdminService, AdminMapper],
})
export class AdminModule{}
