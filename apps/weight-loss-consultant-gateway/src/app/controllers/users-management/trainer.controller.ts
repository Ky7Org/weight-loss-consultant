import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Put,
  Res,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import {Roles} from '../../decorators/roles.decorator';
import {JwtAuthGuard} from '../../guards/jwt-auth.guard';
import {CreateTrainerDto} from '../../dtos/trainer/create-trainer';
import {UpdateTrainerDto} from '../../dtos/trainer/update-trainer';
import {Role} from "../../../../../common/constants/enums";
import {USERS_MANAGEMENT} from "../../../../../common/api.routes";
import {GenericHttpException} from "../../../../../common/filters/generic-http.exception";
import {Client, ClientGrpc} from "@nestjs/microservices";
import {GRPC_TRAINER_SERVICE, USERS_MANAGEMENT_GRPC_SERVICE} from "../../../../../common/grpc-services.route";
import {TrainerService} from "../../../../../common/proto-models/users-mgnt.proto";
import {unwrapGRPCResponse} from "../../../../../common/utils";
import {HttpExceptionFilter} from "../../../../../common/filters/http-exception.filter";

@ApiTags('Trainer')
@ApiBearerAuth()
@Controller(USERS_MANAGEMENT.TRAINERS_API)
export class TrainerController implements OnModuleInit {

  private readonly logger = new Logger(TrainerController.name);

  @Client(USERS_MANAGEMENT_GRPC_SERVICE)
  private readonly usersManagementClient: ClientGrpc;
  private trainerService: TrainerService;
  onModuleInit() {
    this.trainerService = this.usersManagementClient.getService<TrainerService>(GRPC_TRAINER_SERVICE);
  }

  @Roles(Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({ status: HttpStatus.OK, description: 'Trainers have shown below:' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden: Only available for admin role' })
  @Get()
  async index(@Res() res) {
    try {
      const result = await unwrapGRPCResponse(this.trainerService.findAll({}));
      res.status(HttpStatus.OK).send(result);
    } catch (e) {
      throw new GenericHttpException(e);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Get(':email')
  @UseFilters(new HttpExceptionFilter())
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
      const trainer = await unwrapGRPCResponse(this.trainerService.viewDetail({email}));
      res.status(HttpStatus.OK).send(trainer);
    } catch (e) {
      throw new GenericHttpException(e);
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
    //  const result = await this.trainerService.create(dto);
    //  res.status(HttpStatus.CREATED).send(result);
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
     // const result = await this.trainerService.edit(dto, email);
     // res.status(HttpStatus.OK).send(result);
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
    //  const result = await this.trainerService.delete(email);
    //  res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }
}
