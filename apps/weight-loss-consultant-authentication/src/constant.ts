import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { TrainerEntity } from './app/entities/trainer.entity';
import { CustomerEntity } from './app/entities/customer.entity';

export const ormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'ec2-54-251-131-46.ap-southeast-1.compute.amazonaws.com',
  port: 3306,
  username: 'root',
  password: 'Nhatrang@1',
  database: 'weight_loss_consultant',
  entities: [TrainerEntity, CustomerEntity]
};

export const apiEnpoint = "api/v1/authentication"

export const jwtConfig = {
  secret: "SECRET",
  expireTime: "10000s"
}

export enum Role {
  trainer = 0,
  customer = 1
}
