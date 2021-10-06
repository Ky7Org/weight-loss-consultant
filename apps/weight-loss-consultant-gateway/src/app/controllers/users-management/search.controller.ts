import { Body, Controller, HttpStatus, Logger, Post, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchService } from '../../services/search.service';
import { PaginationDto } from '../../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/pagination/pagination.dto';

@ApiTags('Sorting and Filtering')
@ApiBearerAuth()
@Controller('/v1/search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly service: SearchService) {
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
