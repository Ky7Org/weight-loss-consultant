import { ApiProperty } from '@nestjs/swagger';

export class CreateAppliedDto {
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
