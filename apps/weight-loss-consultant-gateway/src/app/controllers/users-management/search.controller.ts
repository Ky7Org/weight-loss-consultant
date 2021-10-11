import {Body, Controller, HttpStatus, Logger, Post, Query, Res} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PaginationDto} from '../../dtos/pagination/pagination.dto';
import {USERS_MANAGEMENT} from "../../../../../common/api.routes";

@ApiTags('Sorting and Filtering')
@ApiBearerAuth()
@Controller(USERS_MANAGEMENT.SEARCH_API)
export class SearchController {
  private readonly logger = new Logger(SearchController.name);
  private readonly service: any;
  constructor() {
  }

  //@Public()
  @Post()
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
    @Body() payload : PaginationDto,
    @Res() res,
    @Query('search') search : string) {
    try {
      const result = await this.service.search(payload, search);
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }


}
