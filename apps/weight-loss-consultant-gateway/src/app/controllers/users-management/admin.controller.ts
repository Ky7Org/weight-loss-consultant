import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  OnModuleInit,
  Param,
  Post,
  Put,
  Res,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../../guards/jwt-auth.guard';
import {CreateAdminDto} from '../../dtos/admin/create-admin.dto';
import {UpdateAdminDto} from '../../dtos/admin/update-admin.dto';
import {Client, ClientGrpc} from "@nestjs/microservices";
import {unwrapGRPCResponse} from "../../../../../common/utils";
import {GRPC_ADMIN_SERVICE, USERS_MANAGEMENT_GRPC_SERVICE} from "../../../../../common/grpc-services.route";
import {AdminService} from "../../../../../common/proto-models/users-mgnt.proto";
import {USERS_MANAGEMENT} from "../../../../../common/api.routes";
import {HttpExceptionFilter} from "../../../../../common/filters/http-exception.filter";
import {GenericHttpException} from "../../../../../common/filters/generic-http.exception";
import {Roles} from "../../decorators/roles.decorator";
import {Role} from "../../../../../common/constants/enums";

export const SWAGGER_UNAUTHORIZED_RESPONSE = "Invalid access token or expired";
export const SWAGGER_GET_ALL_ADMINS_RESPONSE = "The detail of the administrator users";


@ApiTags('Admin')
@ApiBearerAuth()
@Controller(USERS_MANAGEMENT.ADMINS_API)
export class AdminController implements OnModuleInit {

  @Client(USERS_MANAGEMENT_GRPC_SERVICE)
  private readonly adminServiceClient: ClientGrpc;
  private adminService: AdminService;

  onModuleInit() {
    this.adminService = this.adminServiceClient.getService<AdminService>(GRPC_ADMIN_SERVICE);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({status: HttpStatus.OK, description: SWAGGER_GET_ALL_ADMINS_RESPONSE})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: SWAGGER_GET_ALL_ADMINS_RESPONSE})
   async getAllAdmins(@Res() resp) {
    try {
      const result = await unwrapGRPCResponse(this.adminService.findAll({}));
      return resp.status(HttpStatus.OK).send(result);
    } catch (error) {
      throw new GenericHttpException(error);
    }
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({status: HttpStatus.OK, description: 'Admin details has shown below:'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: SWAGGER_UNAUTHORIZED_RESPONSE})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Email not found'})
  @ApiParam({
      name: 'email',
      type: String,
      example: 'email@gmail.com',
      required: true
    }
  )
  async getByEmail(@Param('email') email: string, @Res() res) {
    try {
      const result = await unwrapGRPCResponse(this.adminService.viewDetail({email}));
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @ApiBody({
    type: CreateAdminDto
  })
  @ApiResponse({status: HttpStatus.CREATED, description: 'The new admin has been successfully created.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: SWAGGER_UNAUTHORIZED_RESPONSE})
  @ApiResponse({status: HttpStatus.CONFLICT, description: 'Email has already existed.'})
  async create(@Body() dto: CreateAdminDto, @Res() res) {
    try {
      //  const result = await this.adminService.create(dto);
      res.status(HttpStatus.CREATED).send(null);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }

  @Put(':email')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @UseFilters(new HttpExceptionFilter())
  @ApiBody({
    type: UpdateAdminDto
  })
  @ApiResponse({status: HttpStatus.OK, description: 'The admin information has been successfully updated.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Email not found.'})
  @ApiParam({
    name: 'email',
    type: String,
    example: 'email@gmail.com',
    required: true
  })
  async update(@Param('email') email: string, @Body() payload: UpdateAdminDto, @Res() res) {
    try {
      const result = await unwrapGRPCResponse(this.adminService.update({email, payload}));
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }

  @Delete(':email')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({status: HttpStatus.OK, description: 'The admin information has been successfully deleted.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Email not found.'})
  @ApiParam({
    name: 'email',
    type: String,
    example: 'email@gmail.com',
    required: true
  })
  async delete(@Param('email') email, @Res() res) {
    try {
      const result = await unwrapGRPCResponse(this.adminService.delete({email}));
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }
}
