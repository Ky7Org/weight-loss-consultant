import {EntityRepository, Repository} from "typeorm";
import {AdminEntity} from "../entities/admin.entity";


@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {

}

