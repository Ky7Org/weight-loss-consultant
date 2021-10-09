import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../../guards/jwt-auth.guard';
import {CreatePackageDto} from '../../dtos/package/create-package';
import {UpdatePackageDto} from '../../dtos/package/update-package';
import {PACKAGES_MANAGEMENT} from "../../../../../common/api.routes";
import {PackageService} from "../../services/packages-management/package.service";

@ApiTags('Package')
@ApiBearerAuth()
@Controller(PACKAGES_MANAGEMENT.PACKAGES_API)
export class PackageController {
  private readonly logger = new Logger(PackageController.name);

  constructor(private readonly packageService: PackageService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async index(@Res() res) {
    try {
      const result = await this.packageService.getPackageDetailsWithTrainer();
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Package details has shown below:' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Package ID not found' })
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async getByID(@Param('id') id: number, @Res() res) {
    try {
      const result = await this.packageService.viewDetail(id);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.status).send(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreatePackageDto
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The new package has been successfully created.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() dto: CreatePackageDto, @Res() res) {
    try {
      const result = await this.packageService.create(dto);
      res.status(HttpStatus.CREATED).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: UpdatePackageDto
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'The package information has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Package ID not found.' })
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async update(@Param('id') id: number, @Body() dto: UpdatePackageDto, @Res() res) {
    try {
      const result = await this.packageService.edit(dto, id);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'The package information has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Package ID not found.' })
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async delete(@Param('id') id, @Res() res) {
    try {
      const result = await this.packageService.delete(id);
      res.status(200).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }
}
