import {Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../../guards/jwt-auth.guard";
import {ApiBody, ApiParam, ApiResponse} from "@nestjs/swagger";
import {ContractService} from "../../services/contract.service";
import {CreateContractDto} from "../../dtos/contract/create-health-info.dto";
import {UpdateContractDto} from "../../dtos/contract/update-health-info.dto";


@Controller(`/v1/contracts`)
export class ContractController {

  private readonly logger = new Logger(ContractController.name);

  constructor(private readonly contractService: ContractService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: HttpStatus.OK, description: 'The contracts has shown below.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  async index(@Res() res) {
    try {
      const result = await this.contractService.getHealthInfosWithCustomer();
      res.status(200).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: HttpStatus.OK, description: 'Contract details has shown below:'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Contract ID not found'})
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async getByID(@Param('id') id: number, @Res() res) {
    try {
      const contractInfo = await this.contractService.viewDetail(id);
      if (contractInfo === undefined) {
        const error = {
          statusCode : HttpStatus.NOT_FOUND,
          message: `Not found contract with id: ${id}`
        }
        res.status(error.statusCode).send(error)
      }
      res.status(200).send(contractInfo);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateContractDto
  })
  @ApiResponse({status: HttpStatus.CREATED, description: 'The new contract has been successfully created.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  async create(@Body() dto: CreateContractDto, @Res() res) {
    try {
      const result = await this.contractService.create(dto);
      res.status(HttpStatus.CREATED).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: UpdateContractDto
  })
  @ApiResponse({status: HttpStatus.OK, description: 'The contract has been successfully updated.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Contract Id not found.'})
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async update(@Param('id') id: number, @Body() dto: UpdateContractDto, @Res() res) {
    try {
      const result = await this.contractService.edit(dto, id);
      res.status(200).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status: HttpStatus.OK, description: 'The contract has been successfully deleted.'})
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden.'})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Contract ID not found.'})
  @ApiParam({
      name: 'id',
      type: Number,
      example: '1',
      required: true
    }
  )
  async delete(@Param('id') id: number, @Res() res) {
    try {
      const result = await this.contractService.delete(id);
      res.status(HttpStatus.OK).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }
}
