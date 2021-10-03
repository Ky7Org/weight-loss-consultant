import {
  Body,
  Controller, Delete,
  Get, Logger,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreatePackageDto} from "../dtos/package/create-package";
import {UpdatePackageDto} from "../dtos/package/update-package";
import {PackageService} from "../services/impl/package.service.impl";
import {Roles} from "../author/roles.decorator";
import {Role} from "../constants/enums";

@ApiTags('Package')
@ApiBearerAuth()
@Controller('/v1/packages')
export class PackageController {
  private readonly logger = new Logger(PackageController.name);

  constructor(private readonly packageService: PackageService) {
  }


  @Roles(Role.Trainer)
  @Get()
  async index(@Res() res): Promise<void> {
    try {
      const result = await this.packageService.getPackageDetailsWithTrainer();
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Roles(Role.Trainer, Role.Customer)
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
  async getByID(@Param('id') id: string, @Res() res): Promise<void> {
    try {
      const result = await this.packageService.viewDetail(id);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }

  @Roles(Role.Trainer)
  @Post()
  @ApiBody({
    type: CreatePackageDto
  })
  @ApiResponse({status: 201, description: 'The new package has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  async create(@Body() dto: CreatePackageDto, @Res() res): Promise<void> {
    try {
      const result = await this.packageService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error:e.message});
    }
  }

  @Roles(Role.Trainer)
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
  async update(@Param('id') id : number, @Body() dto: UpdatePackageDto, @Res() res): Promise<void> {
    try {
      const result = await this.packageService.edit(dto, id);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error: e.message});
    }
  }

  @Roles(Role.Trainer)
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
  async delete(@Param('id') id, @Res() res): Promise<void> {
    try {
      const reusult = await this.packageService.delete(id);
      res.status(200).send(reusult);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).send({error: e.message});
    }
  }
}
