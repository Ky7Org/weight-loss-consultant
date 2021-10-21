import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppliedDto {

  @ApiProperty({
    description: 'Applied ID',
    type: String,
  })
  id: number;

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
