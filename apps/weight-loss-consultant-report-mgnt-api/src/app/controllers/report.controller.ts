import {Controller, UseFilters} from '@nestjs/common';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {ReportService} from "../services/report.service";
import {
  CREATE_MEDIA,
  CREATE_REPORT,
  DELETE_MEDIA_BY_ID,
  DELETE_REPORT_BY_ID,
  FIND_ALL_MEDIAS,
  FIND_ALL_REPORTS,
  FIND_MEDIA_BY_ID,
  FIND_REPORT_BY_ID,
  UPDATE_MEDIA_BY_ID,
  UPDATE_REPORT_BY_ID
} from "../../../../common/routes/reports-management-routes";
import {CreateReportDto} from "../dtos/report/create-report.dto";
import {UpdateReportMediaPayload, UpdateReportPayload} from "../../../../common/dtos/update-trainer-dto.payload";
import {CreateReportMediaDto} from "../dtos/report-media/create-report-media.dto";


@Controller()
export class ReportController {

  constructor(private readonly service: ReportService) {
  }

  @MessagePattern({ cmd: FIND_ALL_REPORTS })
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.service.findReports();
  }

  @MessagePattern({ cmd: FIND_ALL_MEDIAS })
  @UseFilters(new ExceptionFilter())
  async indexMedia() {
    return this.service.findReportMedias();
  }


  @MessagePattern({ cmd: FIND_REPORT_BY_ID })
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() id: number) {
    return this.service.viewReportDetail(id);
  }

  @MessagePattern({cmd : FIND_MEDIA_BY_ID})
  @UseFilters(new ExceptionFilter())
  async findMediaById(@Payload() id : number) {
    return this.service.viewReportMediaDetail(id);
  }

  @MessagePattern({ cmd: CREATE_REPORT })
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreateReportDto) {
    return this.service.createReport(dto);
  }

  @MessagePattern({ cmd: CREATE_MEDIA })
  @UseFilters(new ExceptionFilter())
  async createMedia(@Payload() dto: CreateReportMediaDto) {
    return this.service.createReportMedia(dto);
  }

  @MessagePattern({ cmd: UPDATE_REPORT_BY_ID })
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdateReportPayload) {
    return this.service.editReport(payload.dto, payload.id);
  }

  @MessagePattern({ cmd: UPDATE_MEDIA_BY_ID })
  @UseFilters(new ExceptionFilter())
  async updateMedia(@Payload() payload: UpdateReportMediaPayload) {
    return this.service.editReportMedia(payload.dto, payload.id);
  }

  @MessagePattern({ cmd: DELETE_REPORT_BY_ID })
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() id: number) {
    return this.service.deleteReport(id);
  }

  @MessagePattern({ cmd: DELETE_MEDIA_BY_ID })
  @UseFilters(new ExceptionFilter())
  async deleteMedia(@Payload() id: number) {
    return this.service.deleteReportMedia(id);
  }

}
