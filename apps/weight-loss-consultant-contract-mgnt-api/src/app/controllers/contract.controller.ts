import { ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {ContractService} from "../services/impls/contract.service";
import {
  UpdateContractPayloadType
} from "../../../../common/routes/contract-management-service-routes";
import {CreateContractDto} from "../dtos/contract/create-health-info.dto";
import {
  CampaignAndPackageIdPayload,
  GetContractByPackageIDOrCampaignIDPayload
} from "../../../../common/dtos/update-trainer-dto.payload";
import { KAFKA_CONTRACTS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { IKafkaMessage } from '../../../../common/kafka-message.model';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class ContractController {

  constructor(private readonly contractService: ContractService) {
  }

  @MessagePattern(MESSAGE_PATTERN.getAll)
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.contractService.findAll();
  }

  @MessagePattern(MESSAGE_PATTERN.getByID)
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() payload: IKafkaMessage<string>) {
    return this.contractService.viewDetail(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.create)
  @UseFilters(new ExceptionFilter())
  async create(@Payload() payload: IKafkaMessage<CreateContractDto>) {
    return this.contractService.create(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.update)
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: IKafkaMessage<UpdateContractPayloadType>) {
    return this.contractService.edit(payload.value.dto, payload.value.id);
  }

  @MessagePattern(MESSAGE_PATTERN.delete)
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() payload: IKafkaMessage<number>) {
    return this.contractService.del(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.getByCampaignIDOrPackageID)
  @UseFilters(new ExceptionFilter())
  async getContractByPackageIdOrCampaignId(@Payload() payload: IKafkaMessage<GetContractByPackageIDOrCampaignIDPayload>) {
    return this.contractService.getContractByPackageIdOrCampaignId(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.expireContract)
  @UseFilters(new ExceptionFilter())
  async expireContract(@Payload() payload: IKafkaMessage<number>) {
    return this.contractService.expireContract(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.getAnotherInTheSameContract)
  @UseFilters(new ExceptionFilter())
  async getAnother(@Payload() payload: IKafkaMessage<CampaignAndPackageIdPayload>) {
    return this.contractService.getAnotherInTheSameContract(payload.value);
  }
}
