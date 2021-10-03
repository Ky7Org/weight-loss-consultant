import {
  Body,
  Controller, DefaultValuePipe, Delete,
  Get, Logger,
  Param, ParseIntPipe,
  Post,
  Put, Query,
  Res,
} from "@nestjs/common";
import {CustomerService} from "../services/impl/customer.service.impl";
import {CreateCustDto} from "../dtos/customer/create-customer.dto";
import {UpdateCustDto} from "../dtos/customer/update-customer-dto";
import {ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../author/roles.decorator";
import {Role} from "../constants/enums";
import {Public} from "../auth/public-decorator";
import {Pagination} from "nestjs-typeorm-paginate";
import {AdminEntity} from "../entities/admin.entity";
import {MissingParamsException} from "../exceptions/missing.params";

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('/v1/customers')
export class CustomerController {

  private readonly logger = new Logger(CustomerController.name)
  constructor(private readonly customerService: CustomerService) {
  }

  @Roles(Role.Admin)
  @ApiResponse({status: 200, description: 'Customers have shown below:'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @Get()
  async index(@Res() res): Promise<void> {
    try {
      const result = await this.customerService.findAll();
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({send: e.message});
    }
  }

  @Roles(Role.Admin, Role.Customer, Role.Trainer)
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
  async getByEmail(@Param('email') email: string, @Res() res): Promise<void> {
    try {
      const customer = await this.customerService.viewDetail(email);
      res.status(200).send(customer);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Public()
  @Post()
  @ApiBody({
    type: CreateCustDto
  })
  @ApiResponse({status: 201, description: 'The new customer has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 409, description: 'Email has already existed.'})
  async create(@Body() dto: CreateCustDto, @Res() res): Promise<void> {
    try {
      const result = await this.customerService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error:e.message});
    }
  }

  @Roles(Role.Admin, Role.Customer)
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
  async update(@Param('email') email, @Body() dto: UpdateCustDto, @Res() res): Promise<void> {
    try {
      const result = await this.customerService.edit(dto, email);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error:e.message});
    }
  }

  @Roles(Role.Admin, Role.Customer)
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
  async delete(@Param('email') email, @Res() res): Promise<void> {
    try {
      const reusult = await this.customerService.delete(email);
      res.status(200).send(reusult);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error:e.message});
    }
  }

  //sort by email endpoint
  @Roles(Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The customer list was sorted by email'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 412, description: 'Missing some params in URL path.'})
  @Get('/sort/byEmail')
  async sortByEmail(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('order') order?: string
  ): Promise<Pagination<AdminEntity>> {
    //set max record of a page is less than 100
    limit = limit > 100 ? 100 : limit;
    if (!order) {
      throw new MissingParamsException();
    }
    if (order === 'ASC') {
      return await this.customerService.orderByEmailAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.customerService.orderByEmailDescAndPaginate({
        page,
        limit,
      })
    }
  }

//Sort by fullname endpoint
  @Roles(Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The customer list was sorted by fullname'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 412, description: 'Missing some params in URL path.'})
  @Get('/sort/byFullname')
  async sortByFullname(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('order') order?: string
  ): Promise<Pagination<AdminEntity>> {
    //set max record of a page is less than 100
    limit = limit > 100 ? 100 : limit;
    if (!order) {
      throw new MissingParamsException();
    }
    if (order === 'ASC') {
      return await this.customerService.orderByFullNameAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.customerService.orderByFullNameDescAndPaginate({
        page,
        limit,
      })
    }
  }

  //sort by DOB endpoint
  @Roles(Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The customer list was sorted by DOB'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 412, description: 'Missing some params in URL path.'})
  @Get('/sort/byDOB')
  async sortByDOB(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('order') order?: string
  ): Promise<Pagination<AdminEntity>> {
    //set max record of a page is less than 100
    limit = limit > 100 ? 100 : limit;
    if (!order) {
      throw new MissingParamsException();
    }
    if (order === 'ASC') {
      return await this.customerService.orderByDOBAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.customerService.orderByDOBDescAndPaginate({
        page,
        limit,
      })
    }
  }

}
