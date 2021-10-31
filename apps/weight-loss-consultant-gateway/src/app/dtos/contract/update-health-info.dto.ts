import { ApiProperty } from '@nestjs/swagger';

export class UpdateContractDto {
  @ApiProperty({
    description: 'ID of contract',
    minimum: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Total price of contract',
    minimum: 1,
    type: Number,
  })
  totalPrice: number;

  @ApiProperty({
    description: 'Date of contract purchase',
    minimum: 1,
    type: Number,
  })
  timeOfApproved: number;

  @ApiProperty({
    description: 'Date of expired purchase',
    minimum: 1,
    type: Number,
  })
  timeOfExpired: number;

  @ApiProperty({
    description: 'Date of create purchase',
    minimum: 1,
    type: Number,
  })
  timeOfCreate: number;

  @ApiProperty({
    description: 'Status of purchase',
    minimum: 1,
    type: Number,
  })
  status: number;


  @ApiProperty({
    description: 'Campaign ID',
    type: String,
  })
  campaignID: number;

  @ApiProperty({
    description: 'Package ID',
    type: String,
  })
  packageID: number;
}
