import { Body, Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {AppliedService} from "../services/applied.service";
import {
  CREATE_APPLY,
  DELETE_APPLY_BY_ID,
  FIND_ALL_APPLIES,
  FIND_APPLY_BY_ID, GET_APPLIED_PACKAGES_BY_CAMPAIGN_ID,
  UPDATE_APPLY_BY_ID, UpdateApplyPayloadType
} from "../../../../common/routes/applies-management-routes";
import {CreateAppliedDto} from "../dtos/applied/create_applied_dto";



@ApiTags()
@ApiBearerAuth()
@Controller()
export class AppliedController {

  constructor(private readonly appliedService: AppliedService) {
  }

  @MessagePattern({cmd: FIND_ALL_APPLIES})
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.appliedService.findAll();
  }

  @MessagePattern({cmd: FIND_APPLY_BY_ID})
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() id: string) {
    return this.appliedService.viewDetail(id);
  }

  @MessagePattern({cmd: CREATE_APPLY})
  @UseFilters(new ExceptionFilter())
  async create(@Body() dto: CreateAppliedDto) {
    return this.appliedService.create(dto);
  }

  @MessagePattern({cmd: UPDATE_APPLY_BY_ID})
  @UseFilters(new ExceptionFilter())
  async update(@Payload() updatePayload: UpdateApplyPayloadType) {
    return this.appliedService.edit(updatePayload.dto, updatePayload.id);
  }

  @MessagePattern({cmd: DELETE_APPLY_BY_ID})
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() id: number) {
    return this.appliedService.del(id);
  }

  @MessagePattern({cmd: GET_APPLIED_PACKAGES_BY_CAMPAIGN_ID})
  @UseFilters(new ExceptionFilter())
  async getPackages(@Payload() id: number) {
    return this.appliedService.getAppliedPackagesByCampaignID(id);
  }
}
