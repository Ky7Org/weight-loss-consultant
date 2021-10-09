import {CustomerEntity} from "./customer.entity";

export class CampaignEntity {
  id: number;
  description: string;
  status: number;
  startDate: number;
  endDate: number;
  feedback: string;
  customer : CustomerEntity;
}
