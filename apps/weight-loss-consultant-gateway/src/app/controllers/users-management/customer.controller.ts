import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../../services/customer.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateCustDto } from '../../dtos/customer/create-customer.dto';
import { UpdateCustDto } from '../../dtos/customer/update-customer-dto';
import {
  UpdateAdminPayload,
  UpdateCustomerPayloadd
} from "../../../../../common/dtos/update-without-password-and-status.payload";

@ApiTags('Customer')
@ApiBearerAuth()
@Controller()
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

  @Get('/tienAPI/:email')
  async getDetail(@Param('email') email: string, @Res() res) {
    try {
      const customer = await this.customerService.viewDetailSpecial(email);
      if (customer === undefined) {
        const error = {
          statusCode : 404,
          message: `Not found customer with email : ${email}`
        }
        res.status(error.statusCode).send(error);
      }
      res.status(HttpStatus.OK).send(customer.campaigns);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }



  @Get('/v1/customers/:email')
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
      if (customer === undefined) {
        const error = {
          statusCode : 404,
          message: `Not found customer with email : ${email}`
        }
        res.status(error.statusCode).send(error);
      }
      res.status(HttpStatus.OK).send(customer);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Post('/v1/customers')
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

  @Put('/v1/customers/:email')
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


  @Delete('/v1/customers/:email')
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

  @Put('/v1/customers/updateWithoutPasswordAndStatus/:email')
  @UseGuards(JwtAuthGuard)
  async updateAdminWithoutPasswordAndStatus(@Param('email') email, @Body() payload: UpdateCustomerPayloadd, @Res() res) {
    try {
      const result = await this.customerService.updateWithoutPasswordAndStatus(payload);
      res.status(HttpStatus.OK).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

}
