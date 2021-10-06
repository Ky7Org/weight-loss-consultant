import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PackageRepository } from '../repositories/package.repository';
import { PackageService } from '../services/impls/package.service.impl';
import { PackageMapper } from '../mappers/package.mapper';
import { PackageController } from '../controllers/package.controller';
import { TrainerMapper } from '../mappers/trainer.mapper';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT } from '../../../../../constant';


@Module({
  imports: [ClientsModule.register([
    {
      name: USERS_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: USERS_MANAGEMENT_SERVICE_PORT
      }
    }]),
    TypeOrmModule.forFeature([PackageRepository])],
  providers: [PackageService, PackageMapper, TrainerMapper],
  exports: [
    PackageService, PackageMapper, TrainerMapper
  ],
  controllers: [PackageController]
})
export class PackageModule {

}
