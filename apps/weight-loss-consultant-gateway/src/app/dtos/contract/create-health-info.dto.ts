import { ApiProperty } from '@nestjs/swagger';

export class CreateContractDto {
  @ApiProperty({
    description: 'Total price of contract',
    minimum: 1,
    type: Number,
  })
  total: number;

  @ApiProperty({
    description: 'Date of contract purchase',
    minimum: 1,
    type: Number,
  })
  dateOfPurchase: number;

  @ApiProperty({
    description: 'Payment method of contract',
    type: String,
  })
  paymentMethod: string;

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
