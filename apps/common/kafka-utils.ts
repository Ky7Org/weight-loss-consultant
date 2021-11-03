import {AUTHENTICATION_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_NAME} from "../../constant";
import {ClientProviderOptions, Transport} from "@nestjs/microservices";
import {v4 as uuid} from 'uuid';

export const KAFKA_BROKER_ENDPOINT_1 = 'bangmaple.tech:9092';
export const KAFKA_CONSUMER_GROUP_ID = "test-consumer-group";
export const KAFKA_CLIENT_ID = 'weight-loss-consultant';

export const KAFKA_SERVICE = {
  name: USERS_MANAGEMENT_SERVICE_NAME,
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [KAFKA_BROKER_ENDPOINT_1],
    },
    consumer: {
      groupId: `${uuid()}`,
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

export const KAFKA_CONTRACTS_MANAGEMENT_MESSAGE_PATTERN = {
  getAll: 'contracts.get-all',
  getByID: 'contracts.get-by-id',
  create: 'contracts.create',
  update: 'contracts.update',
  delete: 'contracts.delete',
  getByCampaignIDOrPackageID: 'contracts.get-by-campaign-id-or-package-id',
  expireContract: 'contracts.expire-contract',
  getAnotherInTheSameContract: 'contracts.get-another-in-the-same-contract',
};

export const KAFKA_REPORTS_MANAGEMENT_MESSAGE_PATTERN = {
  getAllReports: 'reports.get-all',
  getAllReportMedias: 'reports.get-all-report-medias',
  getByID: 'reports.get-by-id',
  getMediaByID: 'reports.get-media-by-id',
  create: 'reports.create',
  createMedia: 'reports.create-media',
  update: 'reports.update',
  updateMedia: 'reports.update-media',
  delete: 'reports.delete',
  deleteMedia: 'reports.delete-media',
  getByContractID: 'reports.get-by-contract-id',
  approveReport: 'reports.approve-report',
}

export const KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN = {
  customers: {
    getAllCustomers: 'users.customers.get-all',
    getByEmail: 'users.customers.get-by-email',
    getSpecial: 'users.customers.get-special',
    create: 'users.customers.create',
    update: 'users.customers.update',
    delete: 'users.customers.delete',
    updateProfileWithoutPasswordAndStatus: 'users.customers.update-profile-without-password-and-status',
  },
  admins: {
    getAllAdmins: 'users.admins.get-all-admins',
    getByEmail: 'users.admins.get-by-email',
    update: 'users.admins.update',
    delete: 'users.admins.delete',
    create: 'users.admins.create',
    updateProfileWithoutPasswordAndStatus: 'users.admins.update-profile-without-password-and-status',
  },
  trainers: {
    getAllTrainers: 'users.trainers.getAll',
    getByEmail: 'users.trainers.getByEmail',
    create: 'users.trainers.create',
    update: 'users.trainers.update',
    delete: 'users.trainers.delete',
    getSpecial: 'users.trainers.getSpecial',
    updateProfileWithoutPasswordAndStatus: 'users.trainers.update-profile-without-password-and-status',
  }
};
