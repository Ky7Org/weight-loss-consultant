import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import {CustomerService} from "../services/impl/customer.service.impl";
import {CreateCustDto} from "../dtos/customer/create-customer.dto";
import {UpdateCustDto} from "../dtos/customer/update-customer-dto";
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CampaignService} from "../services/impl/campaign.service.impl";
import {CreateCampaignDto} from "../dtos/campaign/create-campaign";
import {UpdateCampaignDto} from "../dtos/campaign/update-campaign";

@ApiTags('Campaign')
@ApiBearerAuth()
@Controller('/v1/campaigns')
export class CampaignController {

  constructor(private readonly campaignService: CampaignService) {
  }

  @Get()
  async index(@Res() res): Promise<any> {
    try {
      const result = await this.campaignService.getCampaignDetailsWithCustomer();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
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
  async getByID(@Param('id') id: string, @Res() res): Promise<any> {
    try {
      const campaign = await this.campaignService.viewDetail(id);
      res.status(200).send(campaign);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

  @Post()
  @ApiBody({
    type: CreateCampaignDto
  })
  @ApiResponse({status: 201, description: 'The new campaign has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  async create(@Body() dto: CreateCampaignDto, @Res() res): Promise<any> {
    try {
      const result = await this.campaignService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      console.error(e.status)
      res.status(e.status).json(e.message);
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateCustDto
  })
  @ApiResponse({status: 200, description: 'The customer information has been successfully updated.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Email not found.'})
  @ApiParam({
      name: "id",
      type: Number,
      example: "1",
      required: true
    }
  )
  async update(@Param('id') id, @Body() dto: UpdateCampaignDto, @Res() res): Promise<any> {
    try {
      const result = await this.campaignService.edit(dto);
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

  @Delete(':id')
  @ApiResponse({status: 200, description: 'The campaign information has been successfully deleted.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Campaign ID not found.'})
  @ApiParam({
      name: "email",
      type: String,
      example: "email@gmail.com",
      required: true
    }
  )
  async delete(@Param('id') id, @Res() res): Promise<any> {
    try {
      const reusult = await this.campaignService.delete(id);
      res.status(200).send(reusult);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }
}
