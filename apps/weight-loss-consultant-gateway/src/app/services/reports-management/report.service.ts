import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { CreateReportDto } from '../../dtos/report/create-report.dto';
import { UpdateReportDto } from '../../dtos/report/update-report.dto';
import { CreateReportMediaDto } from '../../dtos/report-media/create-report-media.dto';
import { UpdateReportMediaDto } from '../../dtos/report-media/update-report-media.dto';
import { ReportEntity } from '../../entities/report.entity';
import { ReportMediaEntity } from '../../entities/report-media.entity';
import { TrainerApproveReportPayload } from '../../../../../common/dtos/update-trainer-dto.payload';
import { KAFKA_REPORTS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../../common/kafka-utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ReportService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN)) {
      this.client.subscribeToResponseOf(value);
    }
    this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async delete(id: number): Promise<DeleteResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.delete, id));
  }

  async deleteMedia(id: number): Promise<DeleteResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.deleteMedia, id));
  }

  async findAll(): Promise<ReportEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getAllReports, ''));
  }

  async findAllMedia(): Promise<ReportMediaEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getAllReportMedias, ''));
  }

  async viewDetail(id: number): Promise<ReportEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByID, id));
  }

  async viewMediaDetail(id: number): Promise<ReportMediaEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getMediaByID, id));
  }

  async create(dto: CreateReportDto): Promise<ReportEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.create, dto));
  }

  async createMedia(dto: CreateReportMediaDto): Promise<ReportMediaEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.createMedia, dto));
  }

  async edit(dto: UpdateReportDto, id: number): Promise<void> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.update, {dto: dto, id: id}));
  }

  async editMedia(dto: UpdateReportMediaDto, id: number): Promise<void> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.updateMedia, {dto: dto, id: id}));
  }

  async findReportByContractID(id: number): Promise<ReportEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByContractID, id));
  }

  async trainerApproveReport(payload: TrainerApproveReportPayload): Promise<void> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.approveReport, payload));
  }
}
