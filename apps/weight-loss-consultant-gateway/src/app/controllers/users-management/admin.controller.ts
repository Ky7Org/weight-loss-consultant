import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AdminService } from '../../services/admin.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateAdminDto } from '../../dtos/admin/create-admin.dto';
import { UpdateAdminDto } from '../../dtos/admin/update-admin.dto';
import {PaginationDto} from "../../dtos/pagination/pagination.dto";


@ApiTags('Admin')
@ApiBearerAuth()
@Controller(`/v1/admins`)
export class AdminController {

  private readonly logger: Logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllAdmins(@Res() res: Response, @Body() payload: PaginationDto) {
    try {
      const result = await this.adminService.getAllAdmins(payload);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
