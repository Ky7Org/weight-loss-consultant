import {
  Body,
  Controller, Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import {CustomerService} from "../services/impl/customer.service.impl";
import {AdminEntity} from "../entities/admin.entity";
import {CustomerEntity} from "../entities/customer.entity";
import {CreateCustDto} from "../dtos/customer/create-customer.dto";
import {UpdateCustDto} from "../dtos/customer/update-customer-dto";
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateAdminDto} from "../dtos/admin/create-admin.dto";

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('/v1/customers')
export class CustomerController {

  constructor(private readonly customerService : CustomerService) {
  }

  @Get()
  index(): Promise<CustomerEntity[]> {
    return this.customerService.findAll();
  }

  @Get(':email')
  @ApiResponse({ status: 200, description: 'Customer details has shown below:'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'Email not found'})
  @ApiParam({
      name :  "email",
      type : "String",
      example : "email@gmail.com",
      required : true
    }
  )
  async getByEmail(@Param('email') email: string): Promise<AdminEntity> {
    const customer = await this.customerService.viewDetail(email);
    if (!customer) {
      throw new NotFoundException(`Not found trainer with email: ${email}`)
    }
    return customer;
  }

  @Post()
  // @UsePipes(ValidationPipe)
  @ApiBody({
    type: CreateCustDto
  })
  @ApiResponse({ status: 201, description: 'The new customer has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 409, description: 'Email has already existed.'})
  async create(@Body() dto: CreateCustDto, @Res() res): Promise<any> {
    try {
      const result = await this.customerService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      console.log(e.status)
      res.status(e.status).json(e.message);
    }
  }

  @Put(':email')
  @ApiBody({
    type: UpdateCustDto
  })
  @ApiResponse({ status: 200, description: 'The customer information has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'Email not found.'})
  @ApiParam({
      name :  "email",
      type : "String",
      example : "email@gmail.com",
      required : true
    }
  )
  async update(@Param('email') email, @Body() dto: UpdateCustDto): Promise<any> {
    console.log(`Updating email: ${dto.email} .....`);
    return this.customerService.edit(dto);
  }

  @Delete(':email')
  @ApiResponse({ status: 200, description: 'The customer information has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 404, description: 'Email not found.'})
  @ApiParam({
      name :  "email",
      type : "String",
      example : "email@gmail.com",
      required : true
    }
  )
  async delete(@Param('email') email): Promise<any> {
    console.log(`Deleting email: ${email} .....`);
    return this.customerService.delete(email);
  }
}
