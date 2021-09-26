import {AdminService} from "../services/impl/admin.service.impl";
import {
  Body, Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Res
} from "@nestjs/common";
import {AdminEntity} from "../entities/admin.entity";
import {TrainerService} from "../services/impl/trainer.service.impl";
import {CreateTrainerDto} from "../dtos/trainer/create-trainer";
import {UpdateTrainerDto} from "../dtos/trainer/update-trainer";
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Trainer')
@ApiBearerAuth()
@Controller('/v1/trainers')
export class TrainerController {

  constructor(private readonly trainerService: TrainerService) {
  }

  @Get()
  async index(@Res() res): Promise<any> {
    try {
      const result = this.trainerService.findAll();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

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
  async getByEmail(@Param('email') email: string, @Res() res): Promise<any> {
    try {
      const trainer = await this.trainerService.viewDetail(email);
      res.status(200).send(trainer);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

  @Post()
  @ApiBody({
    type: CreateTrainerDto
  })
  @ApiResponse({status: 201, description: 'The new trainer has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 409, description: 'Email has already existed.'})
  async create(@Body() dto: CreateTrainerDto, @Res() res): Promise<any> {
    try {
      const result = await this.trainerService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      console.error(e.status)
      res.status(e.status).end();
    }
  }

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
  async update(@Param('email') email, @Body() dto: UpdateTrainerDto, @Res() res): Promise<any> {
    try {
      const result = await this.trainerService.edit(dto);
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(res.status).end();
    }
  }

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
  async delete(@Param('email') email, @Res() res): Promise<any> {
    try {
      const result = await this.trainerService.delete(email);
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }
}
