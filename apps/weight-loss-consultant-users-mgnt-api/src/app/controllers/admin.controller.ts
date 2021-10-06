import { Controller, UseFilters } from '@nestjs/common';
import { AdminService } from '../services/impl/admin.service.impl';
import { CreateAdminDto } from '../dtos/admin/create-admin.dto';
import { UpdateAdminDto } from '../dtos/admin/update-admin.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ADMIN_VIEW_DETAIL,
  CREATE_ADMIN, CUSTOMER_VIEW_DETAIL,
  DELETE_ADMIN,
  GET_ADMIN_BY_EMAIL,
  GET_ALL_ADMINS, TRAINER_VIEW_DETAIL,
  UPDATE_ADMIN
} from '../../../../common/routes/users-management-service-routes';
import { AdminEntity } from '../entities/admin.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerService } from '../services/impl/customer.service.impl';
import { TrainerService } from '../services/impl/trainer.service.impl';
import { TrainerEntity } from '../entities/trainer.entity';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';

type UpdateAdminType = {
  email: string;
  dto: UpdateAdminDto;
};

@Controller()
export class AdminController {

  constructor(private readonly adminService: AdminService,
              private readonly customerService: CustomerService,
              private readonly trainerService: TrainerService) {
  }

  @MessagePattern({ cmd: GET_ALL_ADMINS })
  @UseFilters(new ExceptionFilter())
  async index(): Promise<AdminEntity[]> {
    return this.adminService.findAll();
  }

  @MessagePattern({ cmd: ADMIN_VIEW_DETAIL })
  @UseFilters(new ExceptionFilter())
  async viewAdminDetailByUsername(@Payload() username: string): Promise<AdminEntity> {
    return this.adminService.viewDetail(username);
  }

  @MessagePattern({ cmd: CUSTOMER_VIEW_DETAIL })
  @UseFilters(new ExceptionFilter())
  async viewCustomerDetailByUsername(@Payload() username: string): Promise<CustomerEntity> {
    return this.customerService.findOneCustomer(username);
  }

  @MessagePattern({ cmd: TRAINER_VIEW_DETAIL })
  @UseFilters(new ExceptionFilter())
  async viewTrainerDetailByUsername(@Payload() username: string): Promise<TrainerEntity> {
    return this.trainerService.findOneTrainer(username);
  }

  @MessagePattern({ cmd: GET_ADMIN_BY_EMAIL })
  @UseFilters(new ExceptionFilter())
  async getByEmail(@Payload() email: string): Promise<AdminEntity> {
    return this.adminService.viewDetail(email);
  }

  @MessagePattern({ cmd: CREATE_ADMIN })
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.create(dto);
  }

  @MessagePattern({ cmd: UPDATE_ADMIN })
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdateAdminType): Promise<UpdateResult> {
    return this.adminService.edit(payload.dto);
  }

  @MessagePattern({ cmd: DELETE_ADMIN })
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() email): Promise<DeleteResult> {
    return this.adminService.delete(email);
  }

  /* //sort by email endpoint
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
   }*/

}
