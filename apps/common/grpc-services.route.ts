import {ClientOptions, Transport} from "@nestjs/microservices";
import {resolveGRPCProtosPath} from "./utils";

export const GRPC_SERVICES_HOST = 'localhost';

export const AUTHENTICATION_GRPC_SERVICE_NAME = 'AUTHENTICATION_SERVICE';
export const AUTHENTICATION_GRPC_SERVICE_PORT = '50001';
export const AUTHENTICATION_GRPC_SERVICE_URL = `${GRPC_SERVICES_HOST}:${AUTHENTICATION_GRPC_SERVICE_PORT}`;
export const AUTHENTICATION_GRPC_SERVICE_PACKAGE = 'authentication';
export const AUTHENTICATION_GRPC_SERVICE_PROTO_PATH = resolveGRPCProtosPath('protos/authentication.proto');

export const USERS_MANAGEMENT_GRPC_SERVICE_NAME = 'USERS_MANAGEMENT_SERVICE';
export const USERS_MANAGEMENT_GRPC_SERVICE_PORT = '50002';
export const USERS_MANAGEMENT_GRPC_SERVICE_URL = `${GRPC_SERVICES_HOST}:${USERS_MANAGEMENT_GRPC_SERVICE_PORT}`;
export const USERS_MANAGEMENT_GRPC_SERVICE_PACKAGE = 'users';
export const USERS_MANAGEMENT_GRPC_SERVICE_PROTO_PATH = resolveGRPCProtosPath('protos/users-mgnt.proto');

export const AUTHENTICATION_GRPC_SERVICE: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: AUTHENTICATION_GRPC_SERVICE_URL,
    package: AUTHENTICATION_GRPC_SERVICE_PACKAGE,
    protoPath: AUTHENTICATION_GRPC_SERVICE_PROTO_PATH,
  }
};

export const USERS_MANAGEMENT_GRPC_SERVICE: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: USERS_MANAGEMENT_GRPC_SERVICE_URL,
    package: USERS_MANAGEMENT_GRPC_SERVICE_PACKAGE,
    protoPath: USERS_MANAGEMENT_GRPC_SERVICE_PROTO_PATH,
  }
};

export const GRPC_ADMIN_SERVICE = 'AdminService';
export const ADMIN_SERVICE_FIND_ALL = 'FindAll';
export const ADMIN_SERVICE_VIEW_DETAIL = 'ViewDetail';
export const ADMIN_SERVICE_UPDATE = 'Update';
export const ADMIN_SERVICE_DELETE = 'Delete';
export const ADMIN_SERVICE_CREATE = 'Create';

export const GRPC_CUSTOMER_SERVICE = 'CustomerService';
export const CUSTOMER_SERVICE_FIND_ALL = 'FindAll';
export const CUSTOMER_SERVICE_VIEW_DETAIL = 'ViewDetail';

export const GRPC_TRAINER_SERVICE = 'TrainerService';
export const TRAINER_SERVICE_FIND_ALL = 'FindAll';
export const TRAINER_SERVICE_VIEW_DETAIL = 'ViewDetail';
