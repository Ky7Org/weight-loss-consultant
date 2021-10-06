import { Body, Controller, Logger, Post, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SortingAndFilteringService } from '../services/sorting-filtering.service';
import { PaginationDto } from '../dtos/pagination/pagination.dto';

@ApiTags('Sorting and Filtering')
@ApiBearerAuth()
@Controller('/v1/sortingAndFiltering')
export class SortingAndFilteringController {
  private readonly logger = new Logger(SortingAndFilteringController.name);

  constructor(private readonly service: SortingAndFilteringService) {
  }



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
  async sortAndFilter(
    @Body() payload : PaginationDto,
    @Res() res,
    @Query('search') search : string)
    : Promise<void> {
    try {
      const result =  await this.service.sortingAndFiltering(payload)
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }


}
