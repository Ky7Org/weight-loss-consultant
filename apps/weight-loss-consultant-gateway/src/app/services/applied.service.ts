import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {APPLIED_MANAGEMENT_SERVICE_NAME} from '../../../../../constant';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import {DeleteResult} from 'typeorm';
import {AppliedEntity} from "../entities/applied.entity";
import {
  APPROVED_PACKAGE,
  CREATE_APPLY,
  DELETE_APPLY_BY_ID,
  FIND_ALL_APPLIES,
  FIND_APPLY_BY_ID,
  GET_APPLIED_PACKAGES_BY_CAMPAIGN_ID,
  UPDATE_APPLY_BY_ID,
  UpdateApplyPayloadType
} from "../../../../common/routes/applies-management-routes";
import {CreateAppliedDto} from "../dtos/applied/create_applied_dto";
import {UpdateAppliedDto} from "../dtos/applied/update_applied_dto";
import {PackageEntity} from "../entities/package.entity";
import {ApprovePayload} from "../../../../common/dtos/update-package-dto.payload";
import { KAFKA_APPLIED_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppliedService implements OnModuleInit, OnModuleDestroy {

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
  async getAll(): Promise<AppliedEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getAll, ''));
  }

  async viewDetail(id: number): Promise<AppliedEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByID, id));
  }

  async create(dto: CreateAppliedDto): Promise<AppliedEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.create, dto));
  }


  async edit(dto: UpdateAppliedDto, id: number): Promise<void> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.update, {dto: dto, id: id}));
  }

  async delete(id: number): Promise<DeleteResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.delete, id));
  }
  async getAppliedPackagesByCampaignID(campaignID: number): Promise<any> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByCampaignID, campaignID));
  }

  async approvePackage(payload: ApprovePayload): Promise<any> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.approvePackage, payload));
  }
}
