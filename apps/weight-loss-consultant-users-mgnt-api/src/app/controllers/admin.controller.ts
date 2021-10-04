import { Controller, UseGuards } from '@nestjs/common';
import {AdminService} from "../services/impl/admin.service.impl"
import {CreateAdminDto} from "../dtos/admin/create-admin.dto";
import {UpdateAdminDto} from "../dtos/admin/update-admin.dto";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {GET_ALL_ADMINS, GET_ADMIN_BY_EMAIL, CREATE_ADMIN, UPDATE_ADMIN, DELETE_ADMIN} from "../../../../users-management-service-routes";
import {AdminEntity} from "../entities/admin.entity";
import {DeleteResult, UpdateResult} from "typeorm";
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';

type UpdateAdminType = {
  email: string;
  dto: UpdateAdminDto;
};

@Controller()
export class AdminController {

  constructor(private readonly userService: AdminService) {}
  private readonly logger = new Logger(AdminController.name);

  @MessagePattern({cmd: GET_ALL_ADMINS})
  @UseGuards(FirebaseAuthGuard)
  async index(): Promise<AdminEntity[]> {
    try {
      return this.userService.findAll();
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  @MessagePattern({cmd: GET_ADMIN_BY_EMAIL})
  async getByEmail(@Payload() email: string): Promise<AdminEntity> {
    try {
      return this.userService.viewDetail(email);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  @MessagePattern({cmd: CREATE_ADMIN})
  async create(@Payload() dto: CreateAdminDto): Promise<AdminEntity> {
    try {
      return this.userService.create(dto);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  @MessagePattern({cmd: UPDATE_ADMIN})
  async update(@Payload() payload: UpdateAdminType): Promise<UpdateResult> {
    try {
      return this.userService.edit(payload.dto);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  @MessagePattern({cmd: DELETE_ADMIN})
  async delete(@Payload() email): Promise<DeleteResult> {
    try {
      return this.userService.delete(email);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  //sort by email endpoint
  @Roles(Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The admin list was sorted by email'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 412, description: 'Missing some params in URL path.'})
  @Get('/sort/byEmail')
  async sortByEmail(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('order') order?: string
  ): Promise<Pagination<AdminEntity>> {
    //set max record of a page is less than 100
    limit = limit > 100 ? 100 : limit;
    if (!order) {
      throw new MissingParamsException();
    }
    if (order === 'ASC') {
      return await this.userService.orderByEmailAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.userService.orderByEmailDescAndPaginate({
        page,
        limit,
      })
    }
  }

//Sort by fullname endpoint
  @Roles(Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The admin list was sorted by fullname'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 412, description: 'Missing some params in URL path.'})
  @Get('/sort/byFullname')
  async sortByFullname(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('order') order?: string
  ): Promise<Pagination<AdminEntity>> {
    //set max record of a page is less than 100
    limit = limit > 100 ? 100 : limit;
    if (!order) {
      throw new MissingParamsException();
    }
    if (order === 'ASC') {
      return await this.userService.orderByFullNameAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.userService.orderByFullNameDescAndPaginate({
        page,
        limit,
      })
    }
  }

  //sort by DOB endpoint
  @Roles(Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The admin list was sorted by DOB'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 412, description: 'Missing some params in URL path.'})
  @Get('/sort/byDOB')
  async sortByDOB(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('order') order?: string
  ): Promise<Pagination<AdminEntity>> {
    //set max record of a page is less than 100
    limit = limit > 100 ? 100 : limit;
    if (!order) {
      throw new MissingParamsException();
    }
    if (order === 'ASC') {
      return await this.userService.orderByDOBAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.userService.orderByDOBDescAndPaginate({
        page,
        limit,
      })
    }
  }

}
