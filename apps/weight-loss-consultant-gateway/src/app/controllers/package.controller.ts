import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { CreatePackageDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/package/create-package';
import { UpdatePackageDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/package/update-package';
import { PackageService } from '../services/package.service';

@ApiTags('Package')
@ApiBearerAuth()
@Controller('/api/v1/packages')
export class PackageController {
  private readonly logger = new Logger(PackageController.name);

  constructor(private readonly packageService: PackageService) {
  }

  @Get()
  async index(@Res() res) {
    try {
      const result = await this.packageService.getPackageDetailsWithTrainer();
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'Package details has shown below:'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Package ID not found'})
  @ApiParam({
      name: "id",
      type: Number,
      example: "1",
      required: true
    }
  )
  async getByID(@Param('id') id: number, @Res() res) {
    try {
      const result = await this.packageService.viewDetail(id);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Post()
  @ApiBody({
    type: CreatePackageDto
  })
  @ApiResponse({status: 201, description: 'The new package has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  async create(@Body() dto: CreatePackageDto, @Res() res) {
    try {
      const result = await this.packageService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error:e.message});
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdatePackageDto
  })
  @ApiResponse({status: 200, description: 'The package information has been successfully updated.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Package ID not found.'})
  @ApiParam({
      name: "id",
      type: Number,
      example: "1",
      required: true
    }
  )
  async update(@Param('id') id : number, @Body() dto: UpdatePackageDto, @Res() res) {
    try {
      const result = await this.packageService.edit(dto, id);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error: e.message});
    }
  }

  @Delete(':id')
  @ApiResponse({status: 200, description: 'The package information has been successfully deleted.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Package ID not found.'})
  @ApiParam({
      name: "id",
      type: Number,
      example: "1",
      required: true
    }
  )
  async delete(@Param('id') id, @Res() res) {
    try {
      const result = await this.packageService.delete(id);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error: e.message});
    }
  }
}
