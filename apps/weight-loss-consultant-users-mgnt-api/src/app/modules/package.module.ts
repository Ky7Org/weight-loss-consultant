import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PackageRepository } from '../repositories/package.repository';
import { PackageMapper } from '../mappers/package.mapper';
import { TrainerRepository } from '../repositories/trainer.repository';
import { TrainerService } from '../services/impl/trainer.service.impl';
import { PackageService } from '../services/impl/package.service.impl';
import { TrainerMapper } from '../mappers/trainer.mapper';


@Module({
  imports: [
    TypeOrmModule.forFeature([PackageRepository, TrainerRepository])],
  providers: [PackageService, PackageMapper, TrainerService, TrainerMapper],
  exports: [
    PackageService, PackageMapper, TrainerService, TrainerMapper
  ],
  controllers: []
})
export class PackageModule {
}
