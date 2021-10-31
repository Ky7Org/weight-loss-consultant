import {UpdateStatusCampaignPayload} from "./update-campaign-dto.payload";
import {ApiProperty} from "@nestjs/swagger";

class UpdatePackageDto {
  id: number;
  exercisePlan?:string;
  schedule: string;
  price: number;
  trainerEmail: string;
  status: number;
  dietPlan?: string;
}

export type UpdatePackagePayloadDTO = {
  id: number;
  dto: UpdatePackageDto;
}

export type UpdateStatusPackagePayload = {
  id: number;
  status: number;
}

export type ApprovePayload = {
  packageID: number;
  campaignID: number;
}

export type ApproveResponse = {
  message: string;
}

export class CreateContractDto {
  totalPrice: number;
  timeOfApproved: number;
  timeOfExpired: number;
  timeOfCreate: number;
  status: number;
  paymentMethod: string;
  campaignID: number;
  packageID: number;
}

