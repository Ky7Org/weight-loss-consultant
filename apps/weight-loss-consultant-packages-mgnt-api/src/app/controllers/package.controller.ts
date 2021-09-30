import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  Res, UseGuards,
} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PackageService} from "../services/impls/package.service.impl";
import {CreatePackageDto} from "../dtos/package/create-package";
import {UpdatePackageDto} from "../dtos/package/update-package";
import {JwtAuthGuard} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/auth/jwt-auth.guard";

@ApiTags('Package')
@ApiBearerAuth()
@Controller('/v1/packages')
export class PackageController {

  constructor(private readonly packageService: PackageService) {
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Res() res): Promise<any> {
    try {
      const result = await this.packageService.getPackageDetailsWithTrainer();
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

  @UseGuards(JwtAuthGuard)
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
  async getByID(@Param('id') id: string, @Res() res): Promise<any> {
    try {
      const result = await this.packageService.viewDetail(id);
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).end();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    type: CreatePackageDto
  })
  @ApiResponse({status: 201, description: 'The new package has been successfully created.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  async create(@Body() dto: CreatePackageDto, @Res() res): Promise<any> {
    try {
      const result = await this.packageService.create(dto);
      res.status(200).send(result);
    } catch (e) {
      console.error(e.status)
      res.status(e.status).send({error:e.message});
    }
  }

  @UseGuards(JwtAuthGuard)
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
  async update(@Param('id') id : number, @Body() dto: UpdatePackageDto, @Res() res): Promise<any> {
    try {
      const result = await this.packageService.edit(dto, id);
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(e.status).send({error: e.message});
    }
  }

  @UseGuards(JwtAuthGuard)
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
  async delete(@Param('id') id, @Res() res): Promise<any> {
    try {
      const reusult = await this.packageService.delete(id);
      res.status(200).send(reusult);
    } catch (e) {
      console.error(e);
      res.status(e.status).send({error: e.message});
    }
  }
}
