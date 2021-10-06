import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PackageRepository } from '../repositories/package.repository';
import { PackageService } from '../services/impls/package.service.impl';
import { PackageMapper } from '../mappers/package.mapper';
import { PackageController } from '../controllers/package.controller';
import { TrainerRepository } from '../repositories/trainer.repository';
import { TrainerMapper } from '../mappers/trainer.mapper';
import { TrainerService } from '../services/impls/trainer.service.impl';


@Module({
  imports: [
    TypeOrmModule.forFeature([PackageRepository, TrainerRepository])],
  providers: [PackageService, PackageMapper, TrainerService, TrainerMapper],
  exports: [
    PackageService, PackageMapper, TrainerService, TrainerMapper
  ],
  controllers: [PackageController]
})
export class PackageModule {

}
