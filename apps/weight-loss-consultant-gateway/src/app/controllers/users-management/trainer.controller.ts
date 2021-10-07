import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Roles } from '../../author/roles.decorator';
import { TrainerService } from '../../services/trainer.service';
import { Role } from '../../constants/enums';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateTrainerDto } from '../../dtos/trainer/create-trainer';
import { UpdateTrainerDto } from '../../dtos/trainer/update-trainer';

@ApiTags('Trainer')
@ApiBearerAuth()
@Controller('/v1/trainers')
export class TrainerController {

  private readonly logger = new Logger(TrainerController.name);

  constructor(private readonly trainerService: TrainerService) {
  }

  @Roles(Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Trainers have shown below:' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden: Only available for admin role' })
  @Get()
  async index(@Res() res) {
    try {
      const result = await this.trainerService.findAll();
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Get(':email')
  @ApiResponse({ status: HttpStatus.OK, description: 'Trainer details has shown below:' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Email not found' })
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
      res.status(HttpStatus.OK).send(trainer);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    type: CreateTrainerDto
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The new trainer has been successfully created.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email has already existed.' })
  async create(@Body() dto: CreateTrainerDto, @Res() res) {
    try {
      const result = await this.trainerService.create(dto);
      res.status(HttpStatus.CREATED).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Put(':email')
  @ApiBody({
    type: UpdateTrainerDto
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'The trainer information has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Email not found.' })
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async update(@Param('email') email, @Body() dto: UpdateTrainerDto, @Res() res) {
    try {
      const result = await this.trainerService.edit(dto, email);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Delete(':email')
  @ApiResponse({ status: HttpStatus.OK, description: 'The trainer information has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Email not found.' })
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async delete(@Param('email') email, @Res() res) {
    try {
      const result = await this.trainerService.delete(email);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }
}
