import {HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DeleteResult, getManager, UpdateResult} from 'typeorm';
import {ContractEntity} from "../../entities/contract.entity";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {RpcExceptionModel} from "../../../../../common/filters/rpc-exception.model";
import {ContractMapper} from "../../mappers/health-info.mapper";
import {CreateContractDto} from "../../dtos/contract/create-health-info.dto";
import {UpdateContractDto} from "../../dtos/contract/update-health-info.dto";
import {CAMPAIGN_MANAGEMENT_SERVICE_NAME, PACKAGES_MANAGEMENT_SERVICE_NAME,} from "../../../../../../constant";
import {CampaignEntity} from "../../entities/campaign.entity";
import {Observable} from "rxjs";
import {FIND_CAMPAIGN_BY_ID, UPDATE_STATUS_CAMPAIGN} from "../../../../../common/routes/campaigns-management-routes";
import {PackageEntity} from "../../entities/package.enttiy";
import {FIND_PACKAGE_BY_ID, UPDATE_STATUS_PACKAGE} from "../../../../../common/routes/packages-management-routes";
import {ContractRepository} from "../../repositories/contract.repository";
import {
  CampaignAndPackageIdPayload,
  GetContractByPackageIDOrCampaignIDPayload
} from "../../../../../common/dtos/update-trainer-dto.payload";
import {CAMPAIGN_STATUS, CONTRACT_STATUS, PACKAGE_STATUS} from "../../../../../common/utils";
import {UpdateStatusCampaignPayload} from "../../../../../common/dtos/update-campaign-dto.payload";
import {UpdateStatusPackagePayload} from "../../../../../common/dtos/update-package-dto.payload";

export type ResponseCancelPayload = {
  status: number,
  message: string
}

@Injectable()
export class ContractService {
  constructor(private readonly repository: ContractRepository,
              private readonly mapper: ContractMapper,
              @Inject(CAMPAIGN_MANAGEMENT_SERVICE_NAME)
              private readonly campaignServiceManagementProxy: ClientProxy,
              @Inject(PACKAGES_MANAGEMENT_SERVICE_NAME)
              private readonly packageServiceManagementProxy: ClientProxy
  ) {
  }

  async findAll():
    Promise<ContractEntity[] | null> {
    return await this.repository.createQueryBuilder("contract")
      .leftJoinAndSelect("contract.campaign", "campaign")
      .leftJoinAndSelect("contract.package", "package")
      .getMany();
  }

  async getAll() : Promise<ContractEntity[]> {
    console.log("AAAAAAAAAA")
    const entityManager = getManager();
    const sql = entityManager.query(`
    SELECT \`contract\`.\`id\` AS \`contract_id\`,
       \`contract\`.\`totalPrice\` AS \`contract_totalPrice\`,
       \`contract\`.\`timeOfExpired\` AS \`contract_timeOfExpired\`,
       \`contract\`.\`timeOfCreate\` AS \`contract_timeOfCreate\`,
       \`contract\`.\`status\` AS \`contract_status\`,
       \`contract\`.\`isTrainerCancel\` AS \`contract_isTrainerCancel\`,
       \`contract\`.\`isCustomerCancel\` AS \`contract_isCustomerCancel\`,
       \`contract\`.\`campaignId\` AS \`contract_campaignId\`,
       \`contract\`.\`packageId\` AS \`contract_packageId\`,
       \`campaign\`.\`id\` AS \`campaign_id\`,
       \`campaign\`.\`description\` AS \`campaign_description\`,
       \`campaign\`.\`status\` AS \`campaign_status\`,
       \`campaign\`.\`startDate\` AS \`campaign_startDate\`,
       \`campaign\`.\`endDate\` AS \`campaign_endDate\`,
       \`campaign\`.\`feedback\` AS \`campaign_feedback\`,
       \`campaign\`.\`targetWeight\` AS \`campaign_targetWeight\`,
       \`campaign\`.\`currentWeight\` AS \`campaign_currentWeight\`,
       \`campaign\`.\`spendTimeForTraining\` AS \`campaign_spendTimeForTraining\`,
       \`campaign\`.\`createDate\` AS \`campaign_createDate\`,
       \`campaign\`.\`sessionLength\` AS \`campaign_sessionLength\`,
       \`campaign\`.\`customerEmail\` AS \`campaign_customerEmail\`,
       \`package\`.\`id\` AS \`package_id\`,
       \`package\`.\`exercisePlan\` AS \`package_exercisePlan\`,
       \`package\`.\`schedule\` AS \`package_schedule\`,
       \`package\`.\`price\` AS \`package_price\`, \`package\`.\`status\` AS \`package_status\`,
       \`package\`.\`dietPlan\` AS \`package_dietPlan\`,
       \`package\`.\`spendTimeToTraining\` AS \`package_spendTimeToTraining\`,
       \`package\`.\`trainerEmail\` AS \`package_trainerEmail\`,
       \`package\`.\`sessionLength\` AS \`package_sessionLength\`,
       \`package\`.\`createDate\` AS \`package_createDate\`,
       \`package\`.\`startDate\` AS \`package_startDate\`,
       \`package\`.\`endDate\` AS \`package_endDate\`,
       \`customer\`.\`fullname\` AS \`campaign_fullname\`,
       \`trainer\`.\`fullname\` AS \`package_fullname\`
FROM \`Contract\` \`contract\`
    LEFT JOIN \`Campaign\` \`campaign\` ON \`campaign\`.\`id\`=\`contract\`.\`campaignId\`
    LEFT JOIN \`Package\` \`package\` ON \`package\`.\`id\`=\`contract\`.\`packageId\`
    LEFT JOIN  \`Customer\` \`customer\` ON \`customer\`.\`email\`=\`campaign\`.\`customerEmail\`
    LEFT JOIN  \`Trainer\` \`trainer\` ON \`trainer\`.\`email\`=\`package\`.\`trainerEmail\``)
    return sql;
  }

  private validateCampaign(id: number): Observable<CampaignEntity> {
    return this.campaignServiceManagementProxy
      .send<CampaignEntity, number>({cmd: FIND_CAMPAIGN_BY_ID}, id);
  }

  private validatePackage(id: number): Observable<PackageEntity> {
    return this.packageServiceManagementProxy
      .send<PackageEntity, number>({cmd: FIND_PACKAGE_BY_ID}, id);
  }

  private updateCampaignStatus(payload: UpdateStatusCampaignPayload): Observable<boolean> {
    return this.campaignServiceManagementProxy
      .send({cmd: UPDATE_STATUS_CAMPAIGN}, payload);
  }

  private updatePackageStatus(payload: UpdateStatusPackagePayload): Observable<boolean> {
    return this.packageServiceManagementProxy
      .send({cmd: UPDATE_STATUS_PACKAGE}, payload);
  }

  async create(dto: CreateContractDto): Promise<ContractEntity | null> {
    const campaignID = dto.campaignID;
    const packageID = dto.packageID;
    const existed = await this.checkExistedCampaignOrPackage(packageID, campaignID);
    if (existed) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Package or campaign is already existed in another contract.`
      } as RpcExceptionModel);
    }
    const findCampaign = await this.validateCampaign(campaignID).toPromise();
    if (!findCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not campaign with id : ${campaignID}`
      } as RpcExceptionModel);
    }
    const findPackage = await this.validatePackage(packageID).toPromise();
    if (!findPackage) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not package with id : ${packageID}`
      } as RpcExceptionModel);
    }
    const entity: ContractEntity = await ContractMapper.mapCreateContractDtoToEntity(dto, findCampaign, findPackage);
    return await this.repository.save(entity);
  }

  async edit(dto: UpdateContractDto, id: number): Promise<UpdateResult> {
    if (id != dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const campaignID = dto.campaignID;
    const findCampaign = await this.validateCampaign(campaignID).toPromise();
    if (!findCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${campaignID}`
      } as RpcExceptionModel);
    }
    const packageID = dto.packageID;
    const findPackage = await this.validatePackage(packageID).toPromise();
    if (!findPackage) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found package with id: ${packageID}`
      } as RpcExceptionModel);
    }
    const existContract = await this.viewDetail(dto.id);
    if (!existContract) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not contract with id: ${id}`
      } as RpcExceptionModel);
    }
    const entity: ContractEntity = await ContractMapper.mapUpdateContractDtoToEntity(dto, findCampaign, findPackage);
    return await this.repository.update(id, entity);
  }

  async del(id): Promise<DeleteResult> {
    const existContract = await this.viewDetail(id);
    if (!existContract) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${id}`
      } as RpcExceptionModel);
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id): Promise<ContractEntity> {
    const query = this.repository.createQueryBuilder("contract")
      .where("contract.id = :id", {id: id})
      .leftJoinAndSelect("contract.campaign", "campaign")
      .leftJoinAndSelect("contract.package", "package")
      .getOne();
    return query;
  }

  async viewDetailWithCampaignAndPackage(id: number): Promise<ContractEntity> {
    const query = this.repository.createQueryBuilder("contract")
      .leftJoinAndSelect("contract.campaign", "campaign")
      .leftJoinAndSelect("contract.package", "package")
      .where("contract.id = :id", {id: id})
      .getOne();
    return query;
  }

  async getContractByPackageIdOrCampaignId(payload: GetContractByPackageIDOrCampaignIDPayload): Promise<any> {
    const packageID = payload.packageID ?? "";
    const campaignID = payload.campaignID ?? "";
    const result = this.repository.createQueryBuilder("contract")
      .where("contract.packageID = :packageID", {packageID: packageID})
      .orWhere("contract.campaignID = :campaignID", {campaignID: campaignID})
      .getMany();
    return result;
  }

  //false is not exist, true is exist
  private async checkExistedCampaignOrPackage(packageId: number, campaignId: number): Promise<boolean> {
    const result = await this.repository.createQueryBuilder("contract")
      //Nếu contract đó đã expired thì package đó vẫn có thể tạo contract với campaign khác
      .where("(contract.campaignID = :campaignID OR contract.packageID = :packageID) AND contract.status = :status",
        {campaignID: campaignId, packageID: packageId, status: CONTRACT_STATUS.ONGOING})
      .getOne();
    return result ? true : false;
  }

  async expireContract(contractId: number): Promise<boolean> {
    //find contract
    const exist = await this.viewDetailWithCampaignAndPackage(contractId);
    if (!exist) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${contractId}`
      } as RpcExceptionModel);
    }
    //update campaign status => CLOSED
    const campaignPayload = {
      id: exist.campaign.id,
      status: CAMPAIGN_STATUS.CLOSED
    } as UpdateStatusCampaignPayload
    const updateCampaignStatusResult = await this.updateCampaignStatus(campaignPayload).toPromise();
    if (!updateCampaignStatusResult) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Update campaign status failed`
      } as RpcExceptionModel);
    }
    //update package status => APPROVED
    const packagePayload = {
      id: exist.package.id,
      status: PACKAGE_STATUS.APPROVED
    } as UpdateStatusPackagePayload
    const updatePackageStatusResult = await this.updatePackageStatus(packagePayload).toPromise();
    if (!updatePackageStatusResult) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Update package status failed`
      } as RpcExceptionModel);
    }
    //update contract status => EXPIRED
    const result = await this.repository.createQueryBuilder("contract")
      .update(ContractEntity)
      .set({
        status: CONTRACT_STATUS.EXPIRED
      })
      .where("id = :id", {id: contractId})
      .execute();
    if ((await result.affected) === 1 && updateCampaignStatusResult && updatePackageStatusResult) {
      return true;
    }
    return false;
  }

  private async getCampaignIdByPackageId(packageId: number): Promise<any> {
    const result: ContractEntity = await this.repository.createQueryBuilder("contract")
      .leftJoinAndSelect("contract.campaign", "campaign")
      .where("contract.packageID = :packageId", {packageId: packageId})
      .getOne();
    if (result) {
      const returnResult = {
        campaignID: result.campaign.id
      }
      return returnResult;
    }
  }

  private async getPackageIdByCampaignId(campaignId: number): Promise<any> {
    const result: ContractEntity = await this.repository.createQueryBuilder("contract")
      .leftJoinAndSelect("contract.package", "package")
      .where("contract.campaignID = :campaignId", {campaignId: campaignId})
      .getOne();
    if (result) {
      const returnResult = {
        packageID: result.package.id
      }
      return returnResult;
    }

  }

  async getAnotherInTheSameContract(payload: CampaignAndPackageIdPayload): Promise<any> {
    const campaignId: number = payload.campaignID;
    const packageId: number = payload.packageID;
    if (campaignId) {
      const validateCampaign = await this.validateCampaign(campaignId).toPromise();
      if (!validateCampaign) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found campaign with id : ${campaignId}`
        } as RpcExceptionModel);
      }
      const packageIdReturn = await this.getPackageIdByCampaignId(validateCampaign.id);
      if (!packageIdReturn) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No packageID in the same contract with campaignID: ${campaignId}`
        } as RpcExceptionModel);
      }
      return packageIdReturn;
    }
    if (packageId) {
      const validatePackage = await this.validatePackage(packageId).toPromise();
      if (!validatePackage) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found package with id: ${packageId}`
        } as RpcExceptionModel);
      }
      const campaignIdReturn = await this.getCampaignIdByPackageId(packageId);
      if (!campaignIdReturn) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No campaignID in the same contract with packageID: ${packageId}`
        } as RpcExceptionModel);
      }
      return campaignIdReturn;
    }
  }

  async customerCancelContract(contractId: number): Promise<ResponseCancelPayload> {
    //find contract
    const validateContract: ContractEntity = await this.viewDetail(contractId);
    if (!validateContract) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${contractId}`
      } as RpcExceptionModel);
    }
    //cancel contract at customer side
    const query = await this.repository.createQueryBuilder()
      .update(ContractEntity)
      .set({
        isCustomerCancel: 1
      })
      .where("id = :id", {id: contractId})
      .execute()
    //if trainer approve cancel contract => change status of contract to CLOSED + change status of Campaign to CLOSED, package to DECLINED
    if (validateContract.isTrainerCancel === 1) {
      //change status of campaign to CLOSED
      const campaignPayload = {
        id: validateContract.campaign.id,
        status: CAMPAIGN_STATUS.CLOSED
      } as UpdateStatusCampaignPayload;
      const updateCampaignResult = await this.updateCampaignStatus(campaignPayload).toPromise();
      //change status of package to DECLINED
      const packagePayload = {
        id: validateContract.package.id,
        status: PACKAGE_STATUS.DECLINED
      } as UpdateStatusPackagePayload;
      const updatePackageResult = await this.updatePackageStatus(packagePayload).toPromise();
      if (updateCampaignResult && updatePackageResult) {
        //change status of contract to CANCEL
        const query = await this.repository.createQueryBuilder()
          .update(ContractEntity)
          .set({
            status: CONTRACT_STATUS.CANCEL
          })
          .where("id = :id", {id: contractId})
          .execute();
        const res = {
          status: 200,
          message: 'Cancel contract completed!'
        } as ResponseCancelPayload;
        return res;
      }
    }
    const res = {
      status: 200,
      message: 'Cancel contract at customer side successfully. Awaiting trainer to cancel...'
    } as ResponseCancelPayload;
    return res;
  }

  async trainerCancelContract(contractId: number): Promise<ResponseCancelPayload> {
    //find contract
    const validateContract: ContractEntity = await this.viewDetail(contractId);
    if (!validateContract) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${contractId}`
      } as RpcExceptionModel);
    }
    //cancel contract at trainer side
    const query = await this.repository.createQueryBuilder()
      .update(ContractEntity)
      .set({
        isTrainerCancel: 1
      })
      .where("id = :id", {id: contractId})
      .execute()
    //if customer approve cancel contract => change status of contract to CLOSED + change status of Campaign to CLOSED, package to DECLINED
    if (validateContract.isCustomerCancel === 1) {
      //change status of campaign to CLOSED
      const campaignPayload = {
        id: validateContract.campaign.id,
        status: CAMPAIGN_STATUS.CLOSED
      } as UpdateStatusCampaignPayload;
      const updateCampaignResult = await this.updateCampaignStatus(campaignPayload).toPromise();
      //change status of package to DECLINED
      const packagePayload = {
        id: validateContract.package.id,
        status: PACKAGE_STATUS.DECLINED
      } as UpdateStatusPackagePayload;
      const updatePackageResult = await this.updatePackageStatus(packagePayload).toPromise();
      if (updateCampaignResult && updatePackageResult) {
        //change status of contract to CANCEL
        const query = await this.repository.createQueryBuilder()
          .update(ContractEntity)
          .set({
            status: CONTRACT_STATUS.CANCEL
          })
          .where("id = :id", {id: contractId})
          .execute();
        const res = {
          status: 200,
          message: 'Cancel contract completed!'
        } as ResponseCancelPayload;
        return res;
      }
    }
    const res = {
      status: 200,
      message: 'Cancel contract at trainer side successfully. Awaiting customer to cancel...'
    } as ResponseCancelPayload;
    return res;
  }

  async cancelContract(id: number): Promise<boolean> {
    return false;
  }

  async customerUndoCancelContract(contractId: number): Promise<ResponseCancelPayload> {
    //find contract
    const validateContract: ContractEntity = await this.viewDetail(contractId);
    if (!validateContract) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${contractId}`
      } as RpcExceptionModel);
    }
    const query = await this.repository.createQueryBuilder()
      .update(ContractEntity)
      .set({
        isCustomerCancel: 0 //ACTIVE
      })
      .where("id = :id", {id: validateContract.id})
      .execute();
    if (validateContract.isTrainerCancel === 0) {
      //change status of campaign to ONGOING
      const campaignPayload = {
        id: validateContract.campaign.id,
        status: CAMPAIGN_STATUS.ON_GOING
      } as UpdateStatusCampaignPayload;
      const updateCampaignResult = await this.updateCampaignStatus(campaignPayload).toPromise();
      //change status of package to APPROVED
      const packagePayload = {
        id: validateContract.package.id,
        status: PACKAGE_STATUS.APPROVED
      } as UpdateStatusPackagePayload;
      const updatePackageResult = await this.updatePackageStatus(packagePayload).toPromise();
      if (updateCampaignResult && updatePackageResult) {
        //change status of contract to CANCEL
        const query = await this.repository.createQueryBuilder()
          .update(ContractEntity)
          .set({
            status: CONTRACT_STATUS.ONGOING
          })
          .where("id = :id", {id: contractId})
          .execute();
        const res = {
          status: 200,
          message: 'Undo cancel contract completed!'
        } as ResponseCancelPayload;
        return res;
      }
    }
    const res = {
      status: 200,
      message: 'Undo cancel contract at customer side successfully. Awaiting trainer to undo cancel...'
    } as ResponseCancelPayload;
    return res;
  }

  async trainerUndoCancelContract(contractId: number): Promise<ResponseCancelPayload> {
    //find contract
    const validateContract: ContractEntity = await this.viewDetail(contractId);
    if (!validateContract) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${contractId}`
      } as RpcExceptionModel);
    }
    const query = await this.repository.createQueryBuilder()
      .update(ContractEntity)
      .set({
        isTrainerCancel: 0
      })
      .where("id = :id", {id: contractId})
      .execute();
    console.log(validateContract)
    if (validateContract.isCustomerCancel === 0) {
      //change status of campaign to ONGOING
      const campaignPayload = {
        id: validateContract.campaign.id,
        status: CAMPAIGN_STATUS.ON_GOING
      } as UpdateStatusCampaignPayload;
      const updateCampaignResult = await this.updateCampaignStatus(campaignPayload).toPromise();
      //change status of package to APPROVED
      const packagePayload = {
        id: validateContract.package.id,
        status: PACKAGE_STATUS.APPROVED
      } as UpdateStatusPackagePayload;
      const updatePackageResult = await this.updatePackageStatus(packagePayload).toPromise();
      if (updateCampaignResult && updatePackageResult) {
        //change status of contract to CANCEL
        const query = await this.repository.createQueryBuilder()
          .update(ContractEntity)
          .set({
            status: CONTRACT_STATUS.ONGOING
          })
          .where("id = :id", {id: contractId})
          .execute();
        const res = {
          status: 200,
          message: 'Undo cancel contract completed!'
        } as ResponseCancelPayload;
        return res;
      }
    }
    const res = {
      status: 200,
      message: 'Undo cancel contract at trainer side successfully. Awaiting customer to undo cancel...'
    } as ResponseCancelPayload;
    return res;
  }

}
