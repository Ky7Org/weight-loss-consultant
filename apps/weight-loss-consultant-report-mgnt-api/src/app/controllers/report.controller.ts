import {Controller, UseFilters} from '@nestjs/common';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {ReportService} from "../services/report.service";
import {CreateReportDto} from "../dtos/report/create-report.dto";
import {
  TrainerApproveReportPayload,
  UpdateReportMediaPayload,
  UpdateReportPayload
} from "../../../../common/dtos/update-trainer-dto.payload";
import {CreateReportMediaDto} from "../dtos/report-media/create-report-media.dto";
import { KAFKA_REPORTS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';

@Controller()
export class ReportController {

  constructor(private readonly service: ReportService) {
  }

  @MessagePattern(MESSAGE_PATTERN.getAllReports)
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.service.findReports();
  }

  @MessagePattern(MESSAGE_PATTERN.getAllReportMedias)
  @UseFilters(new ExceptionFilter())
  async indexMedia() {
    return this.service.findReportMedias();
  }

  @MessagePattern(MESSAGE_PATTERN.getByID)
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() id: number) {
    return this.service.viewReportDetail(id);
  }

  @MessagePattern(MESSAGE_PATTERN.getMediaByID)
  @UseFilters(new ExceptionFilter())
  async findMediaById(@Payload() id : number) {
    return this.service.viewReportMediaDetail(id);
  }

  @MessagePattern(MESSAGE_PATTERN.create)
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreateReportDto) {
    const reportEntity = await this.service.customerCreateReport(dto);
    reportEntity.createDate = `${reportEntity.createDate}`
    return reportEntity;
  }

  @MessagePattern(MESSAGE_PATTERN.createMedia)
  @UseFilters(new ExceptionFilter())
  async createMedia(@Payload() dto: CreateReportMediaDto) {
    return this.service.createReportMedia(dto);
  }

  @MessagePattern(MESSAGE_PATTERN.update)
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdateReportPayload) {
    return this.service.editReport(payload.dto, payload.id);
  }

  @MessagePattern(MESSAGE_PATTERN.updateMedia)
  @UseFilters(new ExceptionFilter())
  async updateMedia(@Payload() payload: UpdateReportMediaPayload) {
    return this.service.editReportMedia(payload.dto, payload.id);
  }

  @MessagePattern(MESSAGE_PATTERN.delete)
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() id: number) {
    return this.service.deleteReport(id);
  }

  @MessagePattern(MESSAGE_PATTERN.deleteMedia)
  @UseFilters(new ExceptionFilter())
  async deleteMedia(@Payload() id: number) {
    return this.service.deleteReportMedia(id);
  }

  @MessagePattern(MESSAGE_PATTERN.getByContractID)
  @UseFilters(new ExceptionFilter())
  async findReportByContractID(@Payload() id: number) {
    return this.service.findReportByContractId(id);
  }

  @MessagePattern(MESSAGE_PATTERN.approveReport)
  @UseFilters(new ExceptionFilter())
  async approveReport(@Payload() payload: TrainerApproveReportPayload) {
    return this.service.trainerApproveReport(payload);
  }
}
