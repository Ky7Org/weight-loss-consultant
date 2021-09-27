import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import {CustomerService} from "../services/impl/customer.service.impl";
import {CreateCustDto} from "../dtos/customer/create-customer.dto";
import {UpdateCustDto} from "../dtos/customer/update-customer-dto";
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('/v1/customers')
export class CustomerController {

  constructor(private readonly customerService: CustomerService) {
  }

  @Get()
  async index(@Res() res): Promise<any> {
    try {
      const result = await this.customerService.findAll();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

  @Get(':email')
  @ApiResponse({status: 200, description: 'Customer details has shown below:'})
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
      const customer = await this.customerService.viewDetail(email);
      res.status(200).send(customer);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

  @Post()
  @ApiBody({
    type: CreateCustDto
  })
  @ApiResponse({status: 201, description: 'The new customer has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 409, description: 'Email has already existed.'})
  async create(@Body() dto: CreateCustDto, @Res() res): Promise<any> {
    try {
      const result = await this.customerService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      console.error(e.status)
      res.status(e.status).json(e.message);
    }
  }

  @Put(':email')
  @ApiBody({
    type: UpdateCustDto
  })
  @ApiResponse({status: 200, description: 'The customer information has been successfully updated.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Email not found.'})
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async update(@Param('email') email, @Body() dto: UpdateCustDto, @Res() res): Promise<any> {
    try {
      const result = await this.customerService.edit(dto);
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

  @Delete(':email')
  @ApiResponse({status: 200, description: 'The customer information has been successfully deleted.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Email not found.'})
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async delete(@Param('email') email, @Res() res): Promise<any> {
    try {
      const reusult = await this.customerService.delete(email);
      res.status(200).send(reusult);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }
}
