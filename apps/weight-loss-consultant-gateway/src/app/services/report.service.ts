import {Inject, Injectable} from '@nestjs/common';
import {DeleteResult} from 'typeorm';
import {REPORT_MANAGEMENT_SERVICE_NAME} from '../../../../../constant';
import {ClientProxy} from '@nestjs/microservices';

import {
  CREATE_MEDIA,
  CREATE_REPORT, DELETE_MEDIA_BY_ID,
  DELETE_REPORT_BY_ID, FIND_ALL_MEDIAS,
  FIND_ALL_REPORTS, FIND_MEDIA_BY_ID,
  FIND_REPORT_BY_ID, UPDATE_MEDIA_BY_ID,
  UPDATE_REPORT_BY_ID
} from "../../../../common/routes/reports-management-routes";
import {ReportEntity} from "../../../../weight-loss-consultant-report-mgnt-api/src/app/entities/report.entity";
import {CreateReportDto} from "../dtos/report/create-report.dto";
import {UpdateReportDto} from "../dtos/report/update-report.dto";
import {ReportMediaEntity} from "../../../../weight-loss-consultant-report-mgnt-api/src/app/entities/report-media.entity";
import {CreateReportMediaDto} from "../dtos/report-media/create-report-media.dto";
import {UpdateReportMediaDto} from "../dtos/report-media/update-report-media.dto";

@Injectable()
export class ReportService {

  constructor(@Inject(REPORT_MANAGEMENT_SERVICE_NAME)
              private readonly reportsManagementProxy: ClientProxy) {
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.reportsManagementProxy
      .send<DeleteResult, number>({cmd: DELETE_REPORT_BY_ID}, id)
      .toPromise();
  }

  async deleteMedia(id : number) : Promise<DeleteResult> {
    return this.reportsManagementProxy
      .send<DeleteResult, number>({cmd: DELETE_MEDIA_BY_ID}, id)
      .toPromise();
  }

  async findAll(): Promise<ReportEntity[]> {
    return this.reportsManagementProxy
      .send<ReportEntity[], Record<string, unknown>>({cmd: FIND_ALL_REPORTS}, {})
      .toPromise();
  }

  async findAllMedia() : Promise<ReportMediaEntity[]> {
    return this.reportsManagementProxy
      .send<ReportMediaEntity[], Record<string, unknown>>({cmd: FIND_ALL_MEDIAS}, {})
      .toPromise();
  }

  async viewDetail(id: number): Promise<ReportEntity> {
    return this.reportsManagementProxy
      .send<ReportEntity, number>({cmd: FIND_REPORT_BY_ID}, id)
      .toPromise();
  }

  async viewMediaDetail(id: number) : Promise<ReportMediaEntity> {
    return this.reportsManagementProxy
      .send<ReportMediaEntity, number>({cmd: FIND_MEDIA_BY_ID}, id)
      .toPromise();
  }

  async create(dto: CreateReportDto): Promise<ReportEntity> {
    return this.reportsManagementProxy
      .send<ReportEntity, CreateReportDto>({cmd: CREATE_REPORT}, dto)
      .toPromise();
  }

  async createMedia(dto: CreateReportMediaDto) : Promise<ReportMediaEntity> {
    return this.reportsManagementProxy
      .send<ReportMediaEntity, CreateReportMediaDto>({cmd: CREATE_MEDIA}, dto)
      .toPromise();
  }

  async edit(dto: UpdateReportDto, id: number): Promise<void> {
    return this.reportsManagementProxy
      .send
      ({cmd: UPDATE_REPORT_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }

  async editMedia(dto: UpdateReportMediaDto, id: number) : Promise<void> {
    return this.reportsManagementProxy
      .send
      ({cmd: UPDATE_MEDIA_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }
}
