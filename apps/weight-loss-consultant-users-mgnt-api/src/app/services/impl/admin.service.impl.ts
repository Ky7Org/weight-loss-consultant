import {ConflictException, Injectable, LoggerService, NotFoundException} from "@nestjs/common";
import {BaseService} from "../base.service";
import {
  DeleteResult, InsertResult,
  UpdateResult
} from "typeorm";
import {AdminRepository} from "../../repositories/admin.repository";
import {AdminEntity} from "../../entities/admin.entity";
import {AdminMapper} from "../../mappers/admin.mapper";
import {CreateAdminDto} from "../../dtos/admin/create-admin.dto";
import {UpdateAdminDto} from "../../dtos/admin/update-admin.dto";
import {EMAIL_EXISTED_ERR, NOT_FOUND_ERR_MSG} from "../../constants/validation-err-message";



@Injectable()
export class AdminService extends BaseService<AdminEntity, AdminRepository>{

  constructor(repository: AdminRepository, private adminMapper: AdminMapper){
    super(repository);
  }

  async findAll() : Promise<AdminEntity[] | null>{
    return await this.repository.find();
  }

  async create(dto: CreateAdminDto) : Promise<AdminEntity | null> {
    const entity : AdminEntity  = await AdminMapper.mapCreateAdminDTOToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new ConflictException(EMAIL_EXISTED_ERR);
    }
    console.log(await this.repository.save(entity))
    return await this.repository.save(entity);
  }

  async edit(dto : UpdateAdminDto, email: string) : Promise<UpdateResult> {
    const entity : AdminEntity = await AdminMapper.mapUpdateAdminDTOToEntity(dto);
    if (email !== entity.email) {
      throw new ConflictException(`Param: ${email} must match with request body email : ${entity.email} `)
    }
    const exitsedEmail = await this.repository.findOne(entity.email);
    if (exitsedEmail === undefined) {
      throw new NotFoundException(`Not found admin with email: ${entity.email}`)
    }
    return await this.repository.update(entity.email, entity);
  }

  async delete(id) : Promise<DeleteResult>{
    const foundAdmin = await this.repository.findOne(id);
    if (foundAdmin === undefined) {
      throw new NotFoundException(`Not found admin with email: ${foundAdmin.email}`)
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id) : Promise<AdminEntity | null>{
    const result =  await this.repository.findOne(id);
    if (result === undefined) {
      throw new NotFoundException(NOT_FOUND_ERR_MSG + id)
    }
    return result;
  }

}
