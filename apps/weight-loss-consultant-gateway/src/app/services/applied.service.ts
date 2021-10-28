import {Inject, Injectable} from '@nestjs/common';
import {APPLIED_MANAGEMENT_SERVICE_NAME} from '../../../../../constant';
import {ClientProxy} from '@nestjs/microservices';
import {DeleteResult} from 'typeorm';
import {AppliedEntity} from "../entities/applied.entity";
import {
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

@Injectable()
export class AppliedService {

  constructor(@Inject(APPLIED_MANAGEMENT_SERVICE_NAME)
              private readonly appliedManagementServiceProxy: ClientProxy) {}

  async getAll(): Promise<AppliedEntity[]> {
    return this.appliedManagementServiceProxy
      .send<AppliedEntity[], Record<string, unknown>>({cmd: FIND_ALL_APPLIES}, {})
      .toPromise();
  }

  async viewDetail(id: number): Promise<AppliedEntity> {
    return this.appliedManagementServiceProxy
      .send<AppliedEntity, number>({cmd: FIND_APPLY_BY_ID}, id)
      .toPromise();
  }

  async create(dto: CreateAppliedDto): Promise<AppliedEntity> {
    return this.appliedManagementServiceProxy
      .send<AppliedEntity, CreateAppliedDto>({cmd: CREATE_APPLY}, dto)
      .toPromise();
  }


  async edit(dto: UpdateAppliedDto, id: number): Promise<void> {
    return this.appliedManagementServiceProxy
      .send<void, UpdateApplyPayloadType>
      ({cmd: UPDATE_APPLY_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.appliedManagementServiceProxy
      .send<DeleteResult, number>
      ({cmd: DELETE_APPLY_BY_ID}, id)
      .toPromise();
  }
  async getAppliedPackagesByCampaignID(campaignID: number): Promise<any> {
    const result =  this.appliedManagementServiceProxy
      .send<PackageEntity[], number>
      ({cmd: GET_APPLIED_PACKAGES_BY_CAMPAIGN_ID}, campaignID)
      .toPromise();
    return result;
  }
}
