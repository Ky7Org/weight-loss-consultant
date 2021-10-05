import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Res
} from "@nestjs/common";
import {AdminService} from "../services/impl/admin.service.impl"
import {CreateAdminDto} from "../dtos/admin/create-admin.dto";
import {UpdateAdminDto} from "../dtos/admin/update-admin.dto";
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../author/roles.decorator";
import {Role} from "../constants/enums";


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

  //sort by email endpoint
  @Roles(Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The admin list was sorted by email'})
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
      return await this.userService.orderByEmailAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.userService.orderByEmailDescAndPaginate({
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
  @ApiResponse({status: 200, description: 'The admin list was sorted by fullname'})
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
      return await this.userService.orderByFullNameAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.userService.orderByFullNameDescAndPaginate({
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
  @ApiResponse({status: 200, description: 'The admin list was sorted by DOB'})
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
      return await this.userService.orderByDOBAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.userService.orderByDOBDescAndPaginate({
        page,
        limit,
      })
    }
  }

}
