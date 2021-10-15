import {Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../../guards/jwt-auth.guard";
import {ApiBody, ApiParam, ApiResponse} from "@nestjs/swagger";
import {HealthInfoService} from "../../services/health.service";
import {CreateHealthInfoDto} from "../../dtos/heath-info/create-health-info.dto";
import {UpdateHealthInfoDto} from "../../dtos/heath-info/update-health-info.dto";

@Controller(`/v1/healths`)
export class HealthCheckController {

  private readonly logger = new Logger(HealthCheckController.name);

  constructor(private readonly healthService: HealthInfoService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: HttpStatus.OK, description: 'The health infos has shown below.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  async index(@Res() res) {
    try {
      const result = await this.healthService.getHealthInfosWithCustomer();
      res.status(200).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: HttpStatus.OK, description: 'Health info details has shown below:'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Health info ID not found'})
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async getByID(@Param('id') id: number, @Res() res) {
    try {
      const healthInfo = await this.healthService.viewDetail(id);
      if (healthInfo === undefined) {
        const error = {
          statusCode : 404,
          message : `Not found health info with id: ${id}`
        }
        res.status(error.statusCode).send(error);
      }
      res.status(200).send(healthInfo);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateHealthInfoDto
  })
  @ApiResponse({status: HttpStatus.CREATED, description: 'The new health info has been successfully created.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  async create(@Body() dto: CreateHealthInfoDto, @Res() res) {
    try {
      const result = await this.healthService.create(dto);
      res.status(HttpStatus.CREATED).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: UpdateHealthInfoDto
  })
  @ApiResponse({status: HttpStatus.OK, description: 'The health information has been successfully updated.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Health Info Id not found.'})
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async update(@Param('id') id: number, @Body() dto: UpdateHealthInfoDto, @Res() res) {
    try {
      const result = await this.healthService.edit(dto, id);
      res.status(200).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: HttpStatus.OK, description: 'The health information has been successfully deleted.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Health info ID not found.'})
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async delete(@Param('id') id: number, @Res() res) {
    try {
      const result = await this.healthService.delete(id);
      res.status(HttpStatus.OK).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }
}
