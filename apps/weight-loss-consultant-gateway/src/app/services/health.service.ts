import { Inject, Injectable } from '@nestjs/common';
import {HEALTH_MANAGEMENT_SERVICE_NAME} from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { DeleteResult } from 'typeorm';
import {HeathInfoEntity} from "../entities/health-info.entity";
import {
  CREATE_HEALTH_INFO, DELETE_HEALTH_INFO_BY_ID,
  FIND_ALL_HEALTH_INFO,
  FIND_HEALTH_INFO_BY_ID, UPDATE_HEALTH_INFO_BY_ID, UpdateHealthInfoPayloadType
} from "../../../../common/routes/health-info-management-routes";
import {CreateHealthInfoDto} from "../dtos/heath-info/create-health-info.dto";
import {UpdateHealthInfoDto} from "../dtos/heath-info/update-health-info.dto";

@Injectable()
export class HealthInfoService {

  constructor(@Inject(HEALTH_MANAGEMENT_SERVICE_NAME)
              private readonly healthManagementServiceProxy: ClientProxy) {}

  async getHealthInfosWithCustomer(): Promise<HeathInfoEntity[]> {
    return this.healthManagementServiceProxy
      .send<HeathInfoEntity[], Record<string, unknown>>({cmd: FIND_ALL_HEALTH_INFO}, {})
      .toPromise();
  }

  async viewDetail(id: number): Promise<HeathInfoEntity> {
    return this.healthManagementServiceProxy
      .send<HeathInfoEntity, number>({cmd: FIND_HEALTH_INFO_BY_ID}, id)
      .toPromise();
  }

  async create(dto: CreateHealthInfoDto): Promise<HeathInfoEntity> {
    return this.healthManagementServiceProxy
      .send<HeathInfoEntity, CreateHealthInfoDto>({cmd: CREATE_HEALTH_INFO}, dto)
      .toPromise();
  }


  async edit(dto: UpdateHealthInfoDto, id: number): Promise<void> {
    return this.healthManagementServiceProxy
      .send<void, UpdateHealthInfoPayloadType>
      ({cmd: UPDATE_HEALTH_INFO_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.healthManagementServiceProxy
      .send<DeleteResult, number>
      ({cmd: DELETE_HEALTH_INFO_BY_ID}, id)
      .toPromise();
  }
}
