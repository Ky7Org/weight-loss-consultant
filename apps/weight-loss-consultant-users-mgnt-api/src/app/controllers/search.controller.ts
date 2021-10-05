import {
  Body,
  Controller, Delete,
  Get, Logger,
  Param,
  Post,
  Put, Query,
  Res,
} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreatePackageDto} from "../dtos/package/create-package";
import {UpdatePackageDto} from "../dtos/package/update-package";
import {PackageService} from "../services/impl/package.service.impl";
import {Roles} from "../author/roles.decorator";
import {Role} from "../constants/enums";
import {SortingAndFilteringService} from "../services/sorting-filtering.service";
import {Public} from "../auth/public-decorator";
import {Pagination} from "nestjs-typeorm-paginate";
import {AdminEntity} from "../entities/admin.entity";
import {TrainerEntity} from "../entities/trainer.entity";
import {CustomerEntity} from "../entities/customer.entity";
import {PaginationDto} from "../dtos/pagination/pagination.dto";
import {PaginatedResultDto} from "../dtos/pagination/paginated-result.dto";
import {SearchService} from "../services/search.service";

@ApiTags('Sorting and Filtering')
@ApiBearerAuth()
@Controller('/v1/search')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly service: SearchService) {
  }

  @Public()
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
    @Query('search') search : string)
    : Promise<void> {
    try {
      const result =  await this.service.search(payload, search);
      res.status(200).send(result);
    } catch (e) {
      this.logger.error(e)
      res.status(e.status).end();
    }
  }


}
