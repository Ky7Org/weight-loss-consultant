import { HttpStatus, Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ReportEntity } from '../entities/report.entity';
import { ReportRepository } from '../repositories/report.repository';
import { ReportMediaRepository } from '../repositories/report-media.repository';
import { CreateReportDto } from '../dtos/report/create-report.dto';
import { ReportMediaEntity } from '../entities/report-media.entity';
import { UpdateReportDto } from '../dtos/report/update-report.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { RpcExceptionModel } from '../../../../common/filters/rpc-exception.model';
import { CreateReportMediaDto } from '../dtos/report-media/create-report-media.dto';
import { UpdateReportMediaDto } from '../dtos/report-media/update-report-media.dto';
import { ContractEntity } from '../entities/contract.entity';
import { FIND_CONTRACT_BY_ID } from '../../../../common/routes/contract-management-service-routes';
import { ReportMapper } from '../mappers/report/report.mapper';
import { ReportMediaMapper } from '../mappers/report-media/report-media.mapper';
import { TrainerApproveReportPayload } from '../../../../common/dtos/update-trainer-dto.payload';
import { TRAINER_APPROVAL } from '../../../../common/utils';
import { lastValueFrom } from 'rxjs';
import { KAFKA_CONTRACTS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';

@Injectable()
export class ReportService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private readonly contractManagementClient: ClientKafka;

  constructor(private readonly reportRepository: ReportRepository,
              private readonly reportMediaRepository: ReportMediaRepository) {}

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN)) {
      this.contractManagementClient.subscribeToResponseOf(value);
    }
    this.contractManagementClient.connect();
  }

  async onModuleDestroy() {
    await this.contractManagementClient.close();
  }

  async findReports(): Promise<ReportEntity[]> {
    return this.reportRepository.createQueryBuilder("report")
      .leftJoinAndSelect("report.contract", "Contract")
      .getMany();
  }

  async findReportMedias() : Promise<ReportMediaEntity[]> {
    return this.reportMediaRepository.createQueryBuilder("media")
      .leftJoinAndSelect("media.report", "report")
      .getMany();
  }

  private async validateContract(id : number) : Promise<ContractEntity> {
    return lastValueFrom<ContractEntity>(this.contractManagementClient
      .send<ContractEntity, number>({cmd: FIND_CONTRACT_BY_ID}, id));
  }

  async createReport(dto: CreateReportDto): Promise<ReportEntity> {
    const contractID = dto.contractID;
    const contract = await this.validateContract(contractID);
    if (contract === undefined) {
      throw new RpcException({
            statusCode: HttpStatus.NOT_FOUND,
            message: `Not found contract with id: ${contractID}`
          } as RpcExceptionModel);
    }
    const entity = await ReportMapper.mapCreateReportDtoToEntity(dto, contract);
    return this.reportRepository.save(entity);
  }

  async createReportMedia(dto: CreateReportMediaDto): Promise<ReportMediaEntity> {
    const reportID = dto.reportID;
    const report = await this.viewReportDetail(reportID);
    const entity = await ReportMediaMapper.mapCreateReportMediaDtoToEntity(dto, report);
    return this.reportMediaRepository.save(entity);
  }

  async editReport(dto: UpdateReportDto, id: number): Promise<UpdateResult> {
    const contract = await this.validateContract(dto.contractID);
    if (contract === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${dto.contractID}`
      } as RpcExceptionModel);
    }
    const entity: ReportEntity = await ReportMapper.mapUpdateReportDtoToEntity(dto, contract);
    return this.reportRepository.update(id, entity);
  }

  async editReportMedia(dto: UpdateReportMediaDto, id: number) : Promise<UpdateResult> {
    const reportID : number = dto.reportID;
    const report : ReportEntity = await this.viewReportDetail(reportID);
    const entity : ReportMediaEntity = await ReportMediaMapper.mapUpdateReportMediaDtoToEntity(dto, report);
    return this.reportMediaRepository.update(id, entity);
  }

  async deleteReport(id : number): Promise<DeleteResult> {
    const report : ReportEntity = await this.viewReportDetail(id);
    return this.reportRepository.delete(report.id);
  }

  async deleteReportMedia(id: number) : Promise<DeleteResult> {
    const media : ReportMediaEntity = await this.viewReportMediaDetail(id);
    return this.reportMediaRepository.delete(media.id);
  }

  async viewReportDetail(id: number): Promise<ReportEntity> {
    const result = await this.reportRepository.createQueryBuilder("report")
      .leftJoinAndSelect("report.contract", "contract")
      .where("report.id = :id", {id: id})
      .getOne();
    if (!result) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found report with id: ${id}`
        } as RpcExceptionModel);
    }
    return result;
  }

  async viewReportMediaDetail(id: number) : Promise<ReportMediaEntity> {
    const result = await this.reportMediaRepository.createQueryBuilder("media")
      .leftJoinAndSelect("media.report", "report")
      .where("media.id = :id", {id : id})
      .getOne();
    if (!result) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found report media with id: ${id}`
      } as RpcExceptionModel);
    }
    return result;
  }

  async findReportByContractId(contractID: number) : Promise<ReportEntity[]> {
    return this.reportRepository.createQueryBuilder("report")
      .where("report.contractID = :contractID", {contractID : contractID})
      .getMany();
  }

  async customerCreateReport(payload: CreateReportDto) : Promise<any> {
    const contractID = payload.contractID;
    const contract = await this.validateContract(contractID);
    if (contract === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${contractID}`
      } as RpcExceptionModel);
    }
    const entity = await ReportMapper.mapCreateReportDtoToEntity(payload, contract);
    return this.reportRepository.save(entity);
  }

  //PUT
  async trainerApproveReport(payload: TrainerApproveReportPayload) : Promise<UpdateResult> {
    const trainerFeedback : string = payload.trainerFeedback ?? "";
    const trainerApproval : number = payload.trainerApproval ?? TRAINER_APPROVAL.APPROVED;
    const reportId : number = payload.reportID;
    const viewReport = await this.viewReportDetail(reportId);
    return this.reportRepository.createQueryBuilder("report")
      .update(ReportEntity)
      .set({
          trainerFeedback : trainerFeedback,
          trainerApproval: trainerApproval
      })
      .where("id = :id", {id : viewReport.id})
      .execute();
  }
}
