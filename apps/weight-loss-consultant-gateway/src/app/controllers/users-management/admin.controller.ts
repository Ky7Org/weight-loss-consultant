import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AdminService } from '../../services/admin.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '../../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/admin/create-admin.dto';
import { UpdateAdminDto } from '../../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/admin/update-admin.dto';
import { Roles } from '../../author/roles.decorator';
import { Role } from '../../constants/enums';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller(`/api/v1/admins`)
export class AdminController {

  constructor(private readonly adminService: AdminService) {
  }

  @Get()
  @Roles(Role.Admin)
  async getAllAdmins(@Res() res: Response) {
    try {
      const result = await this.adminService.getAllAdmins();
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      console.error(e);
      if (e.status === 'error') {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message);
        return;
      }
      res.status(HttpStatus.BAD_REQUEST).send(e.message);
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
      res.status(HttpStatus.OK).send(await this.adminService.getByEmail(email));
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).end();
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
      res.status(HttpStatus.CREATED).send(await this.adminService.create(dto));
    } catch (e) {
      res.status(HttpStatus.CONFLICT).end();
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
      res.status(HttpStatus.OK).send(await this.adminService.update(email, dto));
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).end();
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
    res.status(HttpStatus.OK).send(await this.adminService.delete(email));
  }
}
