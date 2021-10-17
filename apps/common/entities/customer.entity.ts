import {CampaignEntity} from "./campaign.entity";

export class CustomerEntity {
  email: string;
  password: string;
  fullname: string;
  address: string;
  phone: string;
  gender: string;
  status: number;
  profileImage: string;
  dob: number;
  campaigns: CampaignEntity[];
}
