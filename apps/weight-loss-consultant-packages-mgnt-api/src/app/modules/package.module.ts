import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PackageRepository } from '../repositories/package.repository';
import { PackageService } from '../services/impls/package.service.impl';
import { PackageMapper } from '../mappers/package.mapper';
import { PackageController } from '../controllers/package.controller';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_SERVICE } from 'apps/common/kafka-utils';


@Module({
  imports: [ClientsModule.register([
    {
      ...KAFKA_SERVICE,
      name: 'SERVER',
    }]),
    TypeOrmModule.forFeature([PackageRepository])],
  providers: [PackageService, PackageMapper],
  exports: [
    PackageService, PackageMapper
  ],
  controllers: [PackageController]
})
export class PackageModule {

}
