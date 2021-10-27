import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CampaignService } from '../../services/campaign.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateCampaignDto } from '../../dtos/campaign/create-campaign';
import { UpdateCampaignDto } from '../../dtos/campaign/update-campaign';

@ApiTags('Campaign')
@ApiBearerAuth()
@Controller('/v1/campaigns')
export class CampaignController {

  private readonly logger = new Logger(CampaignController.name);

  constructor(private readonly campaignService: CampaignService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'The campaigns has shown below.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async index(@Res() res) {
    try {
      const result = await this.campaignService.getCampaignDetailsWithCustomer();
      res.status(200).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Get('/available')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'The campaigns has shown below.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async getAvaiableCampaigns(@Res() res) {
    try {
      const result = await this.campaignService.getAvailableCampaigns();
      res.status(200).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Campaign details has shown below:' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Campaign ID not found' })
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async getByID(@Param('id') id: number, @Res() res) {
    try {
      const campaign = await this.campaignService.viewDetail(id);
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
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The new campaign has been successfully created.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() dto: CreateCampaignDto, @Res() res) {
    try {
      const result = await this.campaignService.create(dto);
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
  @ApiResponse({ status: HttpStatus.OK, description: 'The campaign information has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Campaign Id not found.' })
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async update(@Param('id') id: number, @Body() dto: UpdateCampaignDto, @Res() res){
    try {
      const result = await this.campaignService.edit(dto, id);
      res.status(200).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'The campaign information has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Campaign ID not found.' })
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async delete(@Param('id') id: number, @Res() res) {
    try {
      const result = await this.campaignService.delete(id);
      res.status(HttpStatus.OK).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }
}
