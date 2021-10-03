import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Res} from "@nestjs/common";
import {CreateAdminDto} from "../dtos/admin/create-admin.dto";
import {UpdateAdminDto} from "../dtos/admin/update-admin.dto";
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "../constants/enums";
import {AdminService} from "../services/impls/admin.service.impl";
import {Roles} from "../author/roles.decorator";

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('/v1/admins')
export class AdminController {

  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly userService: AdminService) {
  }

  @Roles(Role.Admin)
  @Get()
  async index(@Res() res): Promise<void> {
    try {
      const result = await this.userService.findAll();
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Roles(Role.Admin)
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
  async getByEmail(@Param('email') email: string, @Res() res): Promise<void> {
    try {
      const admin = await this.userService.viewDetail(email);
      res.status(200).send(admin);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Roles(Role.Admin)
  @Post()
  @ApiBody({
    type: CreateAdminDto
  })
  @ApiResponse({status: 201, description: 'The new admin has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 409, description: 'Email has already existed.'})
  async create(@Body() dto: CreateAdminDto, @Res() res): Promise<void> {
    try {
      const result = await this.userService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Roles(Role.Admin)
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
  async update(@Param('email') email, @Body() dto: UpdateAdminDto, @Res() res): Promise<void> {
    try {
      const result = await this.userService.edit(dto, email);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }

  }

  @Roles(Role.Admin)
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
  async delete(@Param('email') email, @Res() res): Promise<void> {
    try {
      const result = await this.userService.delete(email);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

}
