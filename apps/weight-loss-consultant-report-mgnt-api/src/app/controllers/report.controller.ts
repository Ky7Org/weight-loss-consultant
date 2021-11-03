import { ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
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
import { IKafkaMessage } from '../../../../common/kafka-message.model';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
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
  async getByID(@Payload() payload: IKafkaMessage<number>) {
    return this.service.viewReportDetail(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.getMediaByID)
  @UseFilters(new ExceptionFilter())
  async findMediaById(@Payload() payload: IKafkaMessage<number>) {
    return this.service.viewReportMediaDetail(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.create)
  @UseFilters(new ExceptionFilter())
  async create(@Payload() payload: IKafkaMessage<CreateReportDto>) {
    const reportEntity = await this.service.customerCreateReport(payload.value);
    reportEntity.createDate = `${reportEntity.createDate}`
    return reportEntity;
  }

  @MessagePattern(MESSAGE_PATTERN.createMedia)
  @UseFilters(new ExceptionFilter())
  async createMedia(@Payload() payload: IKafkaMessage<CreateReportMediaDto>) {
    return this.service.createReportMedia(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.update)
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: IKafkaMessage<UpdateReportPayload>) {
    return this.service.editReport(payload.value.dto, payload.value.id);
  }

  @MessagePattern(MESSAGE_PATTERN.updateMedia)
  @UseFilters(new ExceptionFilter())
  async updateMedia(@Payload() payload: IKafkaMessage<UpdateReportMediaPayload>) {
    return this.service.editReportMedia(payload.value.dto, payload.value.id);
  }

  @MessagePattern(MESSAGE_PATTERN.delete)
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() payload: IKafkaMessage<number>) {
    return this.service.deleteReport(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.deleteMedia)
  @UseFilters(new ExceptionFilter())
  async deleteMedia(@Payload() payload: IKafkaMessage<number>) {
    return this.service.deleteReportMedia(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.getByContractID)
  @UseFilters(new ExceptionFilter())
  async findReportByContractID(@Payload() payload: IKafkaMessage<number>) {
    return this.service.findReportByContractId(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.approveReport)
  @UseFilters(new ExceptionFilter())
  async approveReport(@Payload() payload: IKafkaMessage<TrainerApproveReportPayload>) {
    return this.service.trainerApproveReport(payload.value);
  }
}
