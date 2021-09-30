import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {PackageRepository} from "../repositories/package.repository";
import {TrainerRepository} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/repositories/trainer.repository";
import {PackageService} from "../services/impls/package.service.impl";
import {PackageMapper} from "../mappers/package.mapper";
import {TrainerService} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/services/impl/trainer.service.impl";
import {TrainerMapper} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/mappers/trainer.mapper";
import {PackageController} from "../controllers/package.controller";


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
