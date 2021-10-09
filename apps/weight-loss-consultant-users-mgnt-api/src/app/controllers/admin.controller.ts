import {Controller, UseFilters} from '@nestjs/common';
import {AdminService} from '../services/impl/admin.service.impl';
import {CreateAdminDto} from '../dtos/admin/create-admin.dto';
import {GrpcMethod} from '@nestjs/microservices';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';
import {constructGRPCResponse} from "../../../../common/utils";
import {
  ADMIN_SERVICE_CREATE,
  ADMIN_SERVICE_DELETE,
  ADMIN_SERVICE_FIND_ALL,
  ADMIN_SERVICE_UPDATE,
  ADMIN_SERVICE_VIEW_DETAIL,
  GRPC_ADMIN_SERVICE
} from "../../../../common/grpc-services.route";
import {EmailBody, UpdateAdminEntityRequest} from "../../../../common/proto-models/users-mgnt.proto";

@Controller()
export class AdminController {

  constructor(private readonly adminService: AdminService) {}

  @GrpcMethod(GRPC_ADMIN_SERVICE, ADMIN_SERVICE_FIND_ALL)
  @UseFilters(new ExceptionFilter())
  index() {
    return constructGRPCResponse(this.adminService.findAll());
  }

  @GrpcMethod(GRPC_ADMIN_SERVICE, ADMIN_SERVICE_VIEW_DETAIL)
  @UseFilters(new ExceptionFilter())
  viewDetail(payload: EmailBody) {
    return constructGRPCResponse(this.adminService.viewDetail(payload.email));
  }

  @GrpcMethod(GRPC_ADMIN_SERVICE, ADMIN_SERVICE_CREATE)
  @UseFilters(new ExceptionFilter())
  create(dto: CreateAdminDto) {
    return constructGRPCResponse(this.adminService.create(dto));
  }

  @GrpcMethod(GRPC_ADMIN_SERVICE, ADMIN_SERVICE_UPDATE)
  @UseFilters(new ExceptionFilter())
  update(payload: UpdateAdminEntityRequest) {
    return constructGRPCResponse(this.adminService.edit(payload));
  }

  @GrpcMethod(GRPC_ADMIN_SERVICE, ADMIN_SERVICE_DELETE)
  @UseFilters(new ExceptionFilter())
  delete(payload: EmailBody) {
    return constructGRPCResponse(this.adminService.delete(payload.email));
  }
}
