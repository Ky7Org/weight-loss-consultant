import {Controller, UseFilters} from '@nestjs/common';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {ContractService} from "../services/impls/contract.service";
import {
  CREATE_CONTRACT,
  DELETE_CONTRACT_BY_ID,
  EXPIRE_CONTRACT,
  FIND_ALL_CONTRACT,
  FIND_CONTRACT_BY_ID,
  GET_CONTRACT_BY_CAMPAIGN_ID_OR_PACKAGE_ID,
  UPDATE_CONTRACT_BY_ID,
  UpdateContractPayloadType
} from "../../../../common/routes/contract-management-service-routes";
import {CreateContractDto} from "../dtos/contract/create-health-info.dto";
import {GetContractByPackageIDOrCampaignIDPayload} from "../../../../common/dtos/update-trainer-dto.payload";


@Controller()
export class ContractController {

  constructor(private readonly contractService: ContractService) {
  }

  @MessagePattern({ cmd: FIND_ALL_CONTRACT })
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.contractService.findAll();
  }

  @MessagePattern({ cmd: FIND_CONTRACT_BY_ID })
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() id: string) {
    return this.contractService.viewDetail(id);
  }

  @MessagePattern({ cmd: CREATE_CONTRACT })
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreateContractDto) {
    return this.contractService.create(dto);
  }

  @MessagePattern({ cmd: UPDATE_CONTRACT_BY_ID })
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdateContractPayloadType) {
    return this.contractService.edit(payload.dto, payload.id);
  }

  @MessagePattern({ cmd: DELETE_CONTRACT_BY_ID })
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() id: number) {
    return this.contractService.del(id);
  }

  @MessagePattern({ cmd: GET_CONTRACT_BY_CAMPAIGN_ID_OR_PACKAGE_ID })
  @UseFilters(new ExceptionFilter())
  async getContractByPackageIdOrCampaignId(@Payload() payload: GetContractByPackageIDOrCampaignIDPayload) {
    return this.contractService.getContractByPackageIdOrCampaignId(payload);
  }

  @MessagePattern({ cmd: EXPIRE_CONTRACT })
  @UseFilters(new ExceptionFilter())
  async expireContract(@Payload() id: number) {
    return this.contractService.expireContract(id);
  }
}
