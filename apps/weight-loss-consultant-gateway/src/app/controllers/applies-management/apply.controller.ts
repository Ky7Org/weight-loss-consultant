import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateCampaignDto } from '../../dtos/campaign/create-campaign';
import { UpdateCampaignDto } from '../../dtos/campaign/update-campaign';
import {AppliedService} from "../../services/applied.service";
import {CreateAppliedDto} from "../../dtos/applied/create_applied_dto";
import {UpdateAppliedDto} from "../../dtos/applied/update_applied_dto";

@ApiTags('Apply')
@ApiBearerAuth()
@Controller('/v1/applies')
export class ApplyController {

  private readonly logger = new Logger(ApplyController.name);

  constructor(private readonly appliedService: AppliedService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'The applies has shown below.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async index(@Res() res) {
    try {
      const result = await this.appliedService.getAll();
      res.status(200).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Apply details has shown below:' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Apply ID not found' })
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async getByID(@Param('id') id: number, @Res() res) {
    try {
      const campaign = await this.appliedService.viewDetail(id);
      res.status(200).send(campaign);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateCampaignDto
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The new apply has been successfully created.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() dto: CreateAppliedDto, @Res() res) {
    try {
      const result = await this.appliedService.create(dto);
      res.status(HttpStatus.CREATED).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: UpdateCampaignDto
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'The apply information has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Apply Id not found.' })
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async update(@Param('id') id: number, @Body() dto: UpdateAppliedDto, @Res() res){
    try {
      const result = await this.appliedService.edit(dto, id);
      res.status(200).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'The apply information has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Apply ID not found.' })
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async delete(@Param('id') id: number, @Res() res) {
    try {
      const result = await this.appliedService.delete(id);
      res.status(HttpStatus.OK).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

    @Get('/getAppliedPackages/:campaignId')
    @UseGuards(JwtAuthGuard)
    async getPackagesByCampaignID(@Res() res, @Param('campaignId') campaignId: number) {
      try {
        const result = await this.appliedService.getAppliedPackagesByCampaignID(campaignId);
        res.status(HttpStatus.OK).send(result);
      } catch ({error}) {
        this.logger.error(error);
        res.status(error.statusCode).send(error);
      }
  }
}
