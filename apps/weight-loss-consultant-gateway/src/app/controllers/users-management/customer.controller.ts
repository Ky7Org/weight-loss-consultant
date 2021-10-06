import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../../services/customer.service';
import { CreateCustDto } from '../../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/customer/create-customer.dto';
import { UpdateCustDto } from '../../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/customer/update-customer-dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('/v1/customers')
export class CustomerController {

  private readonly logger: Logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async index(@Res() res) {
    try {
      const result = await this.customerService.findAll();
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Get(':email')
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
      const customer = await this.customerService.viewDetail(email);
      res.status(HttpStatus.OK).send(customer);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
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
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
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
      const result = await this.customerService.edit(email, dto);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
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
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

}
