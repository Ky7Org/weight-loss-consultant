import {Body, Controller, HttpStatus, Logger, Post, Put, Query, Res, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {SearchService} from '../../services/search.service';
import {PaginationDto} from '../../dtos/pagination/pagination.dto';
import {JwtAuthGuard} from "../../guards/jwt-auth.guard";
import {
  UpdatePasswordPayload,
  UpdateStatusPayload
} from "../../../../../common/dtos/update-without-password-and-status.payload";

@ApiTags('Sorting and Filtering')
@ApiBearerAuth()
@Controller()
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly service: SearchService) {
  }

  //@Public()
  @Post('/v1/search')
  @ApiBody({
    type: PaginationDto
  })
  @ApiQuery({
    name: 'search',
    type: String
  })
  @ApiResponse({status: 200, description: 'Data has been changed:'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Something wrong occured'})
  async search(
    @Body() payload: PaginationDto,
    @Res() res,
    @Query('search') search: string) {
    try {
      const result = await this.service.search(payload, search);
      res.status(HttpStatus.OK).send(result);
    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }


  @UseGuards(JwtAuthGuard)
  @Put('/v1/updatePassword')
  async updatePassword(@Res() res, @Body() payload: UpdatePasswordPayload) {
    try {
      const result = await this.service.updatePassword(payload);
      if (!result) {
        const error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Update password failed'
        }
        res.status(error.statusCode).send(error);
      }
      res.status(HttpStatus.OK).send(result);

    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/v1/updateStatus')
  async updateStatus(@Res() res, @Body() payload: UpdateStatusPayload) {
    try {
      const result = await this.service.updateStatus(payload);
      if (!result) {
        const error = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Update status failed'
        }
        res.status(error.statusCode).send(error);
      }
      res.status(HttpStatus.OK).send(result);

    } catch ({error}) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }

}
