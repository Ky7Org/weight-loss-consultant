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
import {CreateCustDto} from '../../dtos/customer/create-customer.dto';
import {UpdateCustDto} from '../../dtos/customer/update-customer.dto';
import {USERS_MANAGEMENT} from "../../../../../common/api.routes";
import {Client, ClientGrpc} from "@nestjs/microservices";
import {GRPC_CUSTOMER_SERVICE, USERS_MANAGEMENT_GRPC_SERVICE} from "../../../../../common/grpc-services.route";
import {CustomerService} from "../../../../../common/proto-models/users-mgnt.proto";
import {HttpExceptionFilter} from "../../../../../common/filters/http-exception.filter";
import {GenericHttpException} from "../../../../../common/filters/generic-http.exception";
import {Roles} from "../../decorators/roles.decorator";
import {Role} from "../../../../../common/constants/enums";
import { unwrapGRPCResponse } from '../../../../../common/utils';

@ApiTags('Customer')
@ApiBearerAuth()
@Controller(USERS_MANAGEMENT.CUSTOMERS_API)
export class CustomerController implements OnModuleInit{

  @Client(USERS_MANAGEMENT_GRPC_SERVICE)
  private readonly adminServiceClient: ClientGrpc;
  private customerService: CustomerService;

  onModuleInit() {
    this.customerService = this.adminServiceClient.getService<CustomerService>(GRPC_CUSTOMER_SERVICE);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.Trainer)
  @UseFilters(new HttpExceptionFilter())
  async index(@Res() res) {
    try {
      const result = await unwrapGRPCResponse(this.customerService.findAll({}));
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }

  @Get(':email')
  @UseFilters(new HttpExceptionFilter())
  @Roles(Role.Admin, Role.Trainer)
  @ApiResponse({status: HttpStatus.OK, description: 'Customer details has shown below:'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Email not found'})
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async getByEmail(@Param('email') email: string, @Res() res) {
    try {
      const customer = await unwrapGRPCResponse(this.customerService.viewDetail({email}));
      res.status(HttpStatus.OK).send(customer);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiBody({
    type: CreateCustDto
  })
  @ApiResponse({status: HttpStatus.CREATED, description: 'The new customer has been successfully created.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.CONFLICT, description: 'Email has already existed.'})
  async create(@Body() dto: CreateCustDto, @Res() res) {
    try {
      const result = await this.customerService.create(dto);
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }

  @Put(':email')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: UpdateCustDto
  })
  @ApiResponse({status: HttpStatus.OK, description: 'The customer information has been successfully updated.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Email not found.'})
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async update(@Param('email') email, @Body() dto: UpdateCustDto, @Res() res) {
    try {
      const result = await this.customerService.update({email, dto});
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }

  @Delete(':email')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: HttpStatus.OK, description: 'The customer information has been successfully deleted.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Email not found.'})
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async delete(@Param('email') email, @Res() res) {
    try {
      const result = await this.customerService.delete(email);
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }

}
