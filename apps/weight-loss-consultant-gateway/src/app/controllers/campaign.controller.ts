import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { CreateCampaignDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/campaign/create-campaign';
import { UpdateCampaignDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/campaign/update-campaign';
import { CampaignService } from '../services/campaign.service';

@ApiTags('Campaign')
@ApiBearerAuth()
@Controller('/api/v1/campaigns')
export class CampaignController {

  private readonly logger = new Logger(CampaignController.name);

  constructor(private readonly campaignService: CampaignService) {
  }

  @Get()
  @ApiResponse({status: 200, description: 'The campaigns has shown below.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  async index(@Res() res) {
    try {
      const result = await this.campaignService.getCampaignDetailsWithCustomer();
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'Campaign details has shown below:'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Campaign ID not found'})
  @ApiParam({
      name: "id",
      type: Number,
      example: "1",
      required: true
    }
  )
  async getByID(@Param('id') id: number, @Res() res): Promise<void> {
    try {
      const campaign = await this.campaignService.viewDetail(id);
      res.status(200).send(campaign);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Post()
  @ApiBody({
    type: CreateCampaignDto
  })
  @ApiResponse({status: 201, description: 'The new campaign has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  async create(@Body() dto: CreateCampaignDto, @Res() res): Promise<void> {
    try {
      const result = await this.campaignService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error: e.message});
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateCampaignDto
  })
  @ApiResponse({status: 200, description: 'The campaign information has been successfully updated.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Campaign Id not found.'})
  @ApiParam({
      name: "id",
      type: Number,
      example: "1",
      required: true
    }
  )
  async update(@Param('id') id : number, @Body() dto: UpdateCampaignDto, @Res() res): Promise<void> {
    try {
      const result = await this.campaignService.edit(dto, id);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error: e.message});
    }
  }

  @Delete(':id')
  @ApiResponse({status: 200, description: 'The campaign information has been successfully deleted.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Campaign ID not found.'})
  @ApiParam({
      name: "id",
      type: Number,
      example: "1",
      required: true
    }
  )
  async delete(@Param('id') id: number, @Res() res) {
    try {
      const result = await this.campaignService.delete(id);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error: e.message});
    }
  }
}
