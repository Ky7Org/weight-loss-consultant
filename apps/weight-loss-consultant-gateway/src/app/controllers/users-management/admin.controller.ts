import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { AdminService } from '../../services/admin.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '../../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/admin/create-admin.dto';
import { UpdateAdminDto } from '../../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/admin/update-admin.dto';
import { Roles } from '../../author/roles.decorator';
import { Role } from '../../constants/enums';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller(`/v1/admins`)
export class AdminController {

  private readonly logger: Logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {
  }

  @Get()
  @Roles(Role.Admin)
  async getAllAdmins(@Res() res: Response) {
    try {
      const result = await this.adminService.getAllAdmins();
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Get(':email')
  @ApiResponse({ status: HttpStatus.OK, description: 'Admin details has shown below:' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Email not found' })
  @ApiParam({
      name: 'email',
      type: String,
      example: 'email@gmail.com',
      required: true
    }
  )
  async getByEmail(@Param('email') email: string, @Res() res) {
    try {
      const result = await this.adminService.getByEmail(email);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Post()
  @ApiBody({
    type: CreateAdminDto
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The new admin has been successfully created.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email has already existed.' })
  async create(@Body() dto: CreateAdminDto, @Res() res) {
    try {
      const result = await this.adminService.create(dto);
      res.status(HttpStatus.CREATED).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Put(':email')
  @ApiBody({
    type: UpdateAdminDto
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'The admin information has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Email not found.' })
  @ApiParam({
    name: 'email',
    type: String,
    example: 'email@gmail.com',
    required: true
  })
  async update(@Param('email') email, @Body() dto: UpdateAdminDto, @Res() res) {
    try {
      const result = await this.adminService.update(email, dto);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Delete(':email')
  @ApiResponse({ status: HttpStatus.OK, description: 'The admin information has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Email not found.' })
  @ApiParam({
    name: 'email',
    type: String,
    example: 'email@gmail.com',
    required: true
  })
  async delete(@Param('email') email, @Res() res) {
    try {
      const result = await this.adminService.delete(email);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }
}
