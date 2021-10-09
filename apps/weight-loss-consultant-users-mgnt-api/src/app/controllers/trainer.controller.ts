import {ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors} from '@nestjs/common';
import {TrainerService} from '../services/impl/trainer.service.impl';
import {CreateTrainerDto} from '../dtos/trainer/create-trainer';
import {GrpcMethod, Payload} from '@nestjs/microservices';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';
import {UpdateTrainerPayloadType} from '../../../../common/dtos/update-trainer-dto.payload';
import {
  GRPC_TRAINER_SERVICE,
  TRAINER_SERVICE_FIND_ALL,
  TRAINER_SERVICE_VIEW_DETAIL
} from "../../../../common/grpc-services.route";
import {constructGRPCResponse} from "../../../../common/utils";
import {TrainerEntityViewDetailRequest} from "../../../../common/proto-models/users-mgnt.proto";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {
  }

  @GrpcMethod(GRPC_TRAINER_SERVICE, TRAINER_SERVICE_FIND_ALL)
  @UseFilters(new ExceptionFilter())
  index() {
    return constructGRPCResponse(this.trainerService.findAll());
  }

  @GrpcMethod(GRPC_TRAINER_SERVICE, TRAINER_SERVICE_VIEW_DETAIL)
  @UseFilters(new ExceptionFilter())
  getByEmail(payload: TrainerEntityViewDetailRequest) {
    return constructGRPCResponse(this.trainerService.viewDetail(payload.email));
  }

  @UseFilters(new ExceptionFilter())
  create(@Payload() dto: CreateTrainerDto) {
    return this.trainerService.create(dto);
  }

  @UseFilters(new ExceptionFilter())
  update(@Payload() payload: UpdateTrainerPayloadType) {
    return this.trainerService.edit(payload.dto, payload.email);
  }

  @UseFilters(new ExceptionFilter())
  delete(@Payload() email) {
    return this.trainerService.delete(email);
  }

}
