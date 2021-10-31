import { Injectable } from '@nestjs/common';
import {CreateReportDto} from "../../dtos/report/create-report.dto";
import {ContractEntity} from "../../entities/contract.entity";
import {ReportEntity} from "../../entities/report.entity";
import {UpdateReportDto} from "../../dtos/report/update-report.dto";
import {CreateReportMediaDto} from "../../dtos/report-media/create-report-media.dto";
import {ReportMediaEntity} from "../../entities/report-media.entity";
import {UpdateReportMediaDto} from "../../dtos/report-media/update-report-media.dto";

@Injectable()
export class ReportMediaMapper {

  static async mapCreateReportMediaDtoToEntity(dto: CreateReportMediaDto, report: ReportEntity) : Promise<ReportMediaEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new ReportMediaEntity();
    entity.report = report;
    entity.url = dto.url;
    entity.type = dto.type;
    entity.createDate = new Date().getTime();
    return entity;
  }

  static async mapUpdateReportMediaDtoToEntity(dto: UpdateReportMediaDto, report: ReportEntity) : Promise<ReportMediaEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new ReportMediaEntity();

    entity.report = report;
    entity.url = dto.url;
    entity.type = dto.type;

    return entity;
  }
}
