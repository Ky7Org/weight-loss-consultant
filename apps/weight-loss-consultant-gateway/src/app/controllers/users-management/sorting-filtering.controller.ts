import {Body, Controller, HttpStatus, Logger, Post, Query, Res, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../../guards/jwt-auth.guard';
import {PaginationDto} from '../../dtos/pagination/pagination.dto';
import {SortingAndFilteringService} from "../../services/users-management/sorting-and-filtering.service";
import {USERS_MANAGEMENT} from "../../../../../common/api.routes";

@ApiTags('Sorting and Filtering')
@ApiBearerAuth()
@Controller(USERS_MANAGEMENT.SORTING_AND_FILTERING_API)
export class SortingAndFilteringController {

  private readonly logger = new Logger(SortingAndFilteringController.name);

  constructor(private readonly service: SortingAndFilteringService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
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
    @Query('search') search : string) {
    try {
      const result =  await this.service.sortingAndFiltering(payload)
      res.status(HttpStatus.OK).send(result);
    } catch ({ error }) {
      this.logger.error(error);
      res.status(error.statusCode).send(error);
    }
  }
}
