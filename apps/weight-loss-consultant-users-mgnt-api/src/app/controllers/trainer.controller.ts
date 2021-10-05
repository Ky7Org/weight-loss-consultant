import {
  Body, Controller, DefaultValuePipe,
  Delete,
  Get, Logger,
  Param, ParseIntPipe,
  Post,
  Put, Query,
  Res,
} from "@nestjs/common";
import {TrainerService} from "../services/impl/trainer.service.impl";
import {CreateTrainerDto} from "../dtos/trainer/create-trainer";
import {UpdateTrainerDto} from "../dtos/trainer/update-trainer";
import {ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Pagination} from "nestjs-typeorm-paginate";
import {AdminEntity} from "../entities/admin.entity";
import {MissingParamsException} from "../exceptions/missing.params";

@ApiTags('Trainer')
@ApiBearerAuth()
@Controller('/v1/trainers')
export class TrainerController {

  private readonly logger = new Logger(TrainerController.name);

  constructor(private readonly trainerService: TrainerService) {
  }

 // @Roles(Role.Admin)
  @ApiResponse({status: 200, description: 'Trainers have shown below:'})
  @ApiResponse({status: 403, description: 'Forbidden: Only available for admin role'})
  @Get()
  async index(@Res() res): Promise<void> {
    try {
      const result = await this.trainerService.findAll();
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error:e.message});
    }
  }

  //@Roles(Role.Admin, Role.Trainer)
  @Get(':email')
  @ApiResponse({status: 200, description: 'Trainer details has shown below:'})
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
      const trainer = await this.trainerService.viewDetail(email);
      res.status(200).send(trainer);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error:e.message});
    }
  }

  //@Public()
  @Post()
  @ApiBody({
    type: CreateTrainerDto
  })
  @ApiResponse({status: 201, description: 'The new trainer has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 409, description: 'Email has already existed.'})
  async create(@Body() dto: CreateTrainerDto, @Res() res): Promise<void> {
    try {
      const result = await this.trainerService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error:e.message});
    }
  }

 // @Roles(Role.Admin, Role.Trainer)
  @Put(':email')
  @ApiBody({
    type: UpdateTrainerDto
  })
  @ApiResponse({status: 200, description: 'The trainer information has been successfully updated.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Email not found.'})
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async update(@Param('email') email, @Body() dto: UpdateTrainerDto, @Res() res): Promise<void> {
    try {
      const result = await this.trainerService.edit(dto, email);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(res.status).send({error:e.message});
    }
  }

  //@Roles(Role.Admin, Role.Trainer)
  @Delete(':email')
  @ApiResponse({status: 200, description: 'The trainer information has been successfully deleted.'})
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
      const result = await this.trainerService.delete(email);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error:e.message});
    }
  }

/*  //sort by email endpoint
  //@Roles(Role.Trainer, Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The trainer list was sorted by email'})
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
      return await this.trainerService.orderByEmailAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.trainerService.orderByEmailDescAndPaginate({
        page,
        limit,
      })
    }
  }

  //Sort by fullname endpoint
 // @Roles(Role.Trainer, Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The trainer list was sorted by fullname'})
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
      return await this.trainerService.orderByFullNameAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.trainerService.orderByFullNameDescAndPaginate({
        page,
        limit,
      })
    }
  }

  //sort by DOB endpoint
 // @Roles(Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The trainer list was sorted by DOB'})
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
      return await this.trainerService.orderByDOBAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.trainerService.orderByDOBDescAndPaginate({
        page,
        limit,
      })
    }
  }

  //sort by year of exp endpoint
  //@Roles(Role.Trainer, Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The trainer list was sorted by year of exp'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 412, description: 'Missing some params in URL path.'})
  @Get('/sort/byYearOfExp')
  async sortByYearOfExp(
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
      return await this.trainerService.orderByYearOfExpAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.trainerService.orderByYearOfExpDescAndPaginate({
        page,
        limit,
      })
    }
  }

  //sort by rating endpoint
 // @Roles(Role.Trainer, Role.Admin)
  @ApiQuery({name: 'page', type: Number, description: 'The current page index', example: 1})
  @ApiQuery({name: 'limit', type: Number, description: 'The max record of a page', example: 10})
  @ApiQuery({name: 'order', type: String, description: 'The order to sort, ASC or DESC', example: 'ASC'})
  @ApiResponse({status: 200, description: 'The trainer list was sorted by rating'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 412, description: 'Missing some params in URL path.'})
  @Get('/sort/byRating')
  async sortByRating(
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
      return await this.trainerService.orderByRatingAscAndPaginate({
        page,
        limit,
      })
    } else {
      return await this.trainerService.orderByRatingDescAndPaginate({
        page,
        limit,
      })
    }
  }*/
}
