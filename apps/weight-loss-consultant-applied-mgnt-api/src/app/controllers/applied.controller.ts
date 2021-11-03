import { Body, ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {AppliedService} from "../services/applied.service";
import {
  UpdateApplyPayloadType
} from "../../../../common/routes/applies-management-routes";
import {CreateAppliedDto} from "../dtos/applied/create_applied_dto";
import {ApprovePayload} from "../../../../common/dtos/update-package-dto.payload";
import { KAFKA_APPLIED_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { IKafkaMessage } from '../../../../common/kafka-message.model';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppliedController {

  constructor(private readonly appliedService: AppliedService) {
  }

  @MessagePattern(MESSAGE_PATTERN.getAll)
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.appliedService.findAll();
  }

  @MessagePattern(MESSAGE_PATTERN.getByID)
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() payload: IKafkaMessage<number>) {
    return this.appliedService.viewDetail(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.create)
  @UseFilters(new ExceptionFilter())
  async create(@Payload() payload: IKafkaMessage<CreateAppliedDto>) {
    return this.appliedService.create(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.update)
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: IKafkaMessage<UpdateApplyPayloadType>) {
    return this.appliedService.edit(payload.value.dto, payload.value.id);
  }

  @MessagePattern(MESSAGE_PATTERN.delete)
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() payload: IKafkaMessage<number>) {
    return this.appliedService.del(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.getByCampaignID)
  @UseFilters(new ExceptionFilter())
  async getPackages(@Payload() payload: IKafkaMessage<number>) {
    return this.appliedService.getAppliedPackagesByCampaignID(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.approvePackage)
  @UseFilters(new ExceptionFilter())
  async approvePackage(@Payload() payload: IKafkaMessage<ApprovePayload>) {
    return this.appliedService.approvePackageByCustomer(payload.value);
  }
}
