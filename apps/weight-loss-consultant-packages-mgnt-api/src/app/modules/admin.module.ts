import {AdminRepository} from "../repositories/admin.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {AdminMapper} from "../mappers/admin.mapper";
import { AdminController } from "../controllers/admin.controller";
import {AdminService} from "../services/impls/admin.service.impl";


@Module({
    imports: [
      TypeOrmModule.forFeature([AdminRepository,])],
    providers: [AdminService, AdminMapper],
    exports: [
      AdminService, AdminMapper
    ],
    controllers: [AdminController]
})
export class AdminModule {

}
