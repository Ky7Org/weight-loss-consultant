import {AUTHENTICATION_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_NAME} from "../../constant";
import {ClientProviderOptions, Transport} from "@nestjs/microservices";

export const KAFKA_BROKER_ENDPOINT_1 = 'bangmaple.tech:9092';
export const KAFKA_CONSUMER_GROUP_ID = "test-consumer-group";
export const KAFKA_CLIENT_ID = 'weight-loss-consultant';

export const KAFKA_AUTHENTICATION_SERVICE = {
  name: AUTHENTICATION_SERVICE_NAME,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: KAFKA_CLIENT_ID,
      brokers: [KAFKA_BROKER_ENDPOINT_1],
    },
    consumer: {
      groupId: KAFKA_CONSUMER_GROUP_ID,
    }
  }
} as ClientProviderOptions;

export const KAFKA_USERS_MANAGEMENT_SERVICE = {
  name: USERS_MANAGEMENT_SERVICE_NAME,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: KAFKA_CLIENT_ID,
      brokers: [KAFKA_BROKER_ENDPOINT_1],
    },
    consumer: {
      groupId: KAFKA_CONSUMER_GROUP_ID,
    }
  }
} as ClientProviderOptions;

export const KAFKA_AUTHENTICATION_MESSAGE_PATTERN = {
  login: 'authentication.login',
  resetPassword: 'authentication.reset-password',
  confirmResetPassword: 'authentication.reset-password.confirm',
  validateAccount: 'authentication.validate-account',
  loginWithFirebase: 'authentication.firebase.login',
}

export const KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN = {
  customers: {
    getAllCustomers: 'users.customers.getAll',
    getByEmail: 'users.customers.getByEmail',
    getSpecial: 'users.customers.getSpecial',
    create: 'users.customers.create',
    update: 'users.customers.update',
    delete: 'users.customers.delete',
  },
  getAllAdmins: 'users.get-all-admins',
  getByEmail: 'users.get-by-email',
  update: 'users.update',
  delete: 'users.delete',
  create: 'users.create',
};
