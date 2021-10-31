import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {Roles} from '../../decorators/roles.decorator';
import {Role} from '../../constants/enums';
import {JwtAuthGuard} from '../../guards/jwt-auth.guard';
import {ReportService} from "../../services/report.service";
import {CreateReportDto} from "../../dtos/report/create-report.dto";
import {UpdateReportDto} from "../../dtos/report/update-report.dto";
import {CreateReportMediaDto} from "../../dtos/report-media/create-report-media.dto";
import {UpdateReportMediaDto} from "../../dtos/report-media/update-report-media.dto";

@ApiTags('Report')
@ApiBearerAuth()
@Controller()
export class ReportController {

  private readonly logger = new Logger(ReportController.name);

  constructor(private readonly service: ReportService) {
  }

  @Roles(Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Get('/v1/reports')
  async index(@Res() res) {
    try {
      const result = await this.service.findAll();
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Get('/v1/medias')
  async indexMedia(@Res() res) {
    try {
      const result = await this.service.findAllMedia();
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Get('/v1/reports/:id')
  async getByEmail(@Param('id') id: number, @Res() res): Promise<void> {
    try {
      const trainer = await this.service.viewDetail(id);
      res.status(HttpStatus.OK).send(trainer);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Get('/v1/medias/:id')
  async getByEmailMedia(@Param('id') id: number, @Res() res): Promise<void> {
    try {
      const trainer = await this.service.viewMediaDetail(id);
      res.status(HttpStatus.OK).send(trainer);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Post('/v1/reports')
  async create(@Body() dto: CreateReportDto, @Res() res) {
    try {
      const result = await this.service.create(dto);
      res.status(HttpStatus.CREATED).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Post('/v1/medias')
  async createMedia(@Body() dto: CreateReportMediaDto, @Res() res) {
    try {
      const result = await this.service.createMedia(dto);
      res.status(HttpStatus.CREATED).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Put('/v1/reports/:id')
  async update(@Param('id') id : number, @Body() dto: UpdateReportDto, @Res() res) {
    try {
      const result = await this.service.edit(dto, id);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Put('/v1/medias/:id')
  async updateMedia(@Param('id') id : number, @Body() dto: UpdateReportMediaDto, @Res() res) {
    try {
      const result = await this.service.editMedia(dto, id);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Delete('/v1/reports/:id')
  async delete(@Param('id') id : number, @Res() res) {
    try {
      const result = await this.service.delete(id);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Roles(Role.Admin, Role.Trainer)
  @UseGuards(JwtAuthGuard)
  @Delete('/v1/medias/:id')
  async deleteMedia(@Param('id') id : number, @Res() res) {
    try {
      const result = await this.service.deleteMedia(id);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

}
