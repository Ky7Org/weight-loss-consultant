import { Controller, UseFilters } from '@nestjs/common';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {HealthInfoService} from "../services/impls/health.service";
import {
  CREATE_HEALTH_INFO, DELETE_HEALTH_INFO_BY_ID,
  FIND_ALL_HEALTH_INFO,
  FIND_HEALTH_INFO_BY_ID, UPDATE_HEALTH_INFO_BY_ID, UpdateHealthInfoPayloadType
} from "../../../../common/routes/health-info-management-routes";
import {CreateHealthInfoDto} from "../dtos/heath-info/create-health-info.dto";


@Controller()
export class HealthCheckController {

  constructor(private readonly healthService: HealthInfoService) {
  }

  @MessagePattern({ cmd: FIND_ALL_HEALTH_INFO })
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.healthService.getHealthInfoDetailsWithCustomer();
  }

  @MessagePattern({ cmd: FIND_HEALTH_INFO_BY_ID })
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() id: string) {
    return this.healthService.viewDetail(id);
  }

  @MessagePattern({ cmd: CREATE_HEALTH_INFO })
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreateHealthInfoDto) {
    return this.healthService.create(dto);
  }

  @MessagePattern({ cmd: UPDATE_HEALTH_INFO_BY_ID })
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdateHealthInfoPayloadType) {
    return this.healthService.edit(payload.dto, payload.id);
  }

  @MessagePattern({ cmd: DELETE_HEALTH_INFO_BY_ID })
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() id: number) {
    return this.healthService.delete(id);
  }
}
