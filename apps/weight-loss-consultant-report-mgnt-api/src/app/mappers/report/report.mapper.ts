import { Injectable } from '@nestjs/common';
import {CreateReportDto} from "../../dtos/report/create-report.dto";
import {ContractEntity} from "../../entities/contract.entity";
import {ReportEntity} from "../../entities/report.entity";
import {UpdateReportDto} from "../../dtos/report/update-report.dto";

@Injectable()
export class ReportMapper {

  static async mapCreateReportDtoToEntity(dto: CreateReportDto, contract: ContractEntity) : Promise<ReportEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new ReportEntity();
    entity.date = dto.date;
    entity.exerciseDescription = dto.exerciseDescription;
    entity.dietDescription = dto.dietDescription;
    entity.trainerFeedback = dto.trainerFeedback;
    entity.trainerApproval = dto.trainerApproval;
    entity.weight = dto.weight;
    entity.createDate = new Date().getTime();
    entity.contract = contract;
    return entity;
  }

  static async mapUpdateReportDtoToEntity(dto: UpdateReportDto, contract : ContractEntity) : Promise<ReportEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new ReportEntity();

    entity.date = dto.date;
    entity.exerciseDescription = dto.exerciseDescription;
    entity.dietDescription = dto.dietDescription;
    entity.trainerFeedback = dto.trainerFeedback;
    entity.trainerApproval = dto.trainerApproval;
    entity.weight = dto.weight;
    entity.contract = contract;

    return entity;
  }
}
