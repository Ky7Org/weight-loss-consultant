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
