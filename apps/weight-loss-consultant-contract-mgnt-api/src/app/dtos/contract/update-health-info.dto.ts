import { ApiProperty } from '@nestjs/swagger';

export class UpdateContractDto {
  id: number;

  totalPrice: number;

  timeOfExpired: number;

  timeOfCreate: number;

  status: number;

  campaignID: number;

  packageID: number;
}
