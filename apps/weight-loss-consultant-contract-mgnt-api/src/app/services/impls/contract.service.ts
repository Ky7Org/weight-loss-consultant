import {HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DeleteResult, UpdateResult} from 'typeorm';
import {ContractEntity} from "../../entities/contract.entity";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {RpcExceptionModel} from "../../../../../common/filters/rpc-exception.model";
import {ContractMapper} from "../../mappers/health-info.mapper";
import {CreateContractDto} from "../../dtos/contract/create-health-info.dto";
import {UpdateContractDto} from "../../dtos/contract/update-health-info.dto";
import {CAMPAIGN_MANAGEMENT_SERVICE_NAME, PACKAGES_MANAGEMENT_SERVICE_NAME,} from "../../../../../../constant";
import {CampaignEntity} from "../../entities/campaign.entity";
import { lastValueFrom, Observable } from 'rxjs';
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

  async findAll(): Promise<ContractEntity[] | null> {
    return this.repository.createQueryBuilder("contract")
      .leftJoinAndSelect("contract.campaign", "campaign")
      .leftJoinAndSelect("contract.package", "package")
      .getMany();
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
    return this.repository.save(entity);
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
    return this.repository.update(id, entity);
  }

  async del(id): Promise<DeleteResult> {
    const existContract = await this.viewDetail(id);
    if (!existContract) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${id}`
      } as RpcExceptionModel);
    }
    return this.repository.delete(id);
  }

  async viewDetail(id): Promise<ContractEntity> {
    return this.repository.createQueryBuilder("contract")
      .where("contract.id = :id", {id: id})
      .getOneOrFail().catch((err) => {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found contract with id: ${id}`
        } as RpcExceptionModel);
      });
  }

  async viewDetailWithCampaignAndPackage(id: number): Promise<ContractEntity> {
    return this.repository.createQueryBuilder("contract")
      .leftJoinAndSelect("contract.campaign", "campaign")
      .leftJoinAndSelect("contract.package", "package")
      .where("contract.id = :id", {id: id})
      .getOneOrFail().catch((err) => {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found contract with id: ${id}`
        } as RpcExceptionModel);
      });  }

  async getContractByPackageIdOrCampaignId(payload: GetContractByPackageIDOrCampaignIDPayload): Promise<any> {
    const packageID = payload.packageID ?? "";
    const campaignID = payload.campaignID ?? "";
    return this.repository.createQueryBuilder("contract")
      .where("contract.packageID = :packageID", {packageID: packageID})
      .orWhere("contract.campaignID = :campaignID", {campaignID: campaignID})
      .getMany();
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
      return {
        campaignID: result.campaign.id
      }
    }
  }

  private async getPackageIdByCampaignId(campaignId: number): Promise<any> {
    const result: ContractEntity = await this.repository.createQueryBuilder("contract")
      .leftJoinAndSelect("contract.package", "package")
      .where("contract.campaignID = :campaignId", {campaignId: campaignId})
      .getOne();
    if (result) {
      return {
        packageID : result.package.id
      }
    }

  }

  async getAnotherInTheSameContract(payload: CampaignAndPackageIdPayload): Promise<any> {
    const campaignId: number = payload.campaignID;
    const packageId: number = payload.packageID;
    if (campaignId) {
      const validateCampaign = await lastValueFrom(this.validateCampaign(campaignId));
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

}
