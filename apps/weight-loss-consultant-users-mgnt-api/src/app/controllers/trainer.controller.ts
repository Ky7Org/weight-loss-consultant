import { Controller, UseFilters } from '@nestjs/common';
import { TrainerService } from '../services/impl/trainer.service.impl';
import { CreateTrainerDto } from '../dtos/trainer/create-trainer';
import { GrpcMethod } from '@nestjs/microservices';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import { UpdateTrainerPayloadType } from '../../../../common/dtos/update-trainer-dto.payload';
import {
  GRPC_TRAINER_SERVICE,
  TRAINER_SERVICE_CREATE,
  TRAINER_SERVICE_DELETE,
  TRAINER_SERVICE_FIND_ALL,
  TRAINER_SERVICE_UPDATE,
  TRAINER_SERVICE_VIEW_DETAIL
} from '../../../../common/grpc-services.route';
import { constructGRPCResponse } from '../../../../common/utils';
import { TrainerEntityViewDetailRequest } from '../../../../common/proto-models/users-mgnt.proto';

@Controller()
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

  @GrpcMethod(GRPC_TRAINER_SERVICE, TRAINER_SERVICE_CREATE)
  @UseFilters(new ExceptionFilter())
  create(dto: CreateTrainerDto) {
    return constructGRPCResponse(this.trainerService.create(dto));
  }

  @GrpcMethod(GRPC_TRAINER_SERVICE, TRAINER_SERVICE_UPDATE)
  @UseFilters(new ExceptionFilter())
  update(payload: UpdateTrainerPayloadType) {
    return this.trainerService.edit(payload.dto, payload.email);
  }

  @GrpcMethod(GRPC_TRAINER_SERVICE, TRAINER_SERVICE_DELETE)
  @UseFilters(new ExceptionFilter())
  delete(email: string) {
    return this.trainerService.delete(email);
  }

}
