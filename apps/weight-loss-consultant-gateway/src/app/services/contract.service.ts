import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {DeleteResult} from 'typeorm';
import {ContractEntity} from "../entities/contract.entity";
import {
  CREATE_CONTRACT,
  DELETE_CONTRACT_BY_ID,
  EXPIRE_CONTRACT,
  FIND_ALL_CONTRACT,
  FIND_CONTRACT_BY_ID, GET_ANOTHER_IN_THE_SAME_CONTRACT,
  GET_CONTRACT_BY_CAMPAIGN_ID_OR_PACKAGE_ID,
  UPDATE_CONTRACT_BY_ID,
} from "../../../../common/routes/contract-management-service-routes";
import {CreateContractDto} from "../dtos/contract/create-health-info.dto";
import {UpdateContractDto} from "../dtos/contract/update-health-info.dto";
import {
  CampaignAndPackageIdPayload,
  GetContractByPackageIDOrCampaignIDPayload
} from "../../../../common/dtos/update-trainer-dto.payload";
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CONTRACTS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ContractService implements OnModuleInit, OnModuleDestroy {

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
  async getHealthInfosWithCustomer(): Promise<ContractEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getAll, ''));
  }

  async viewDetail(id: number): Promise<ContractEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByID, id));
  }

  async create(dto: CreateContractDto): Promise<ContractEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.create, dto));
  }

  async edit(dto: UpdateContractDto, id: number): Promise<void> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.update, {dto: dto, id: id}));
  }

  async delete(id: number): Promise<DeleteResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.delete, id));
  }

  async getContractByPackageIdOrCampaignId(payload: GetContractByPackageIDOrCampaignIDPayload): Promise<ContractEntity>{
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByCampaignIDOrPackageID, payload));
  }

  async expireContract(id: number) : Promise<void> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.expireContract, id));
  }

  async getAnother(payload: CampaignAndPackageIdPayload) : Promise<any> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getAnotherInTheSameContract, payload));
  }
}
