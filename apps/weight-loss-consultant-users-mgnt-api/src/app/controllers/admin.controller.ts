import {
  Body,
  Controller, Delete,
  Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UsePipes, ValidationPipe
}
  from "@nestjs/common";
import {AdminService} from "../services/impl/admin.service.impl"
import {AdminEntity} from "../entities/admin.entity";
import {CreateAdminDto} from "../dtos/admin/create-admin.dto";
import {UpdateAdminDto} from "../dtos/admin/update-admin.dto";
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('/v1/admins')
export class AdminController {

  constructor(private readonly userService: AdminService) {
  }

  @Get()
  async index(@Res() res): Promise<any> {
    try {
      const result = await this.userService.findAll();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

  @Get(':email')
  @ApiResponse({status: 200, description: 'Admin details has shown below:'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Email not found'})
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async getByEmail(@Param('email') email: string, @Res() res): Promise<any> {
    try {
      const admin = await this.userService.viewDetail(email);
      res.status(200).send(admin);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }


  @Post()
  @ApiBody({
    type: CreateAdminDto
  })
  @ApiResponse({status: 201, description: 'The new admin has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 409, description: 'Email has already existed.'})
  async create(@Body() dto: CreateAdminDto, @Res() res): Promise<any> {
    try {
      const result = await this.userService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      console.error(e)
      res.status(e.status).end();
    }
  }

  @Put(':email')
  @ApiBody({
    type: UpdateAdminDto
  })
  @ApiResponse({status: 200, description: 'The admin information has been successfully updated.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Email not found.'})
  @ApiParam({
    name: "email",
    type: String,
    example: "email@gmail.com",
    required: true
  })
  async update(@Param('email') email, @Body() dto: UpdateAdminDto, @Res() res): Promise<any> {
    try {
      const result = await this.userService.edit(dto);
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }

  }

  @Delete(':email')
  @ApiResponse({status: 200, description: 'The admin information has been successfully deleted.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Email not found.'})
  @ApiParam({
    name: "email",
    type: String,
    example: "email@gmail.com",
    required: true
  })
  async delete(@Param('email') email, @Res() res): Promise<any> {
    try {
      const result = await this.userService.delete(email);
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

}
