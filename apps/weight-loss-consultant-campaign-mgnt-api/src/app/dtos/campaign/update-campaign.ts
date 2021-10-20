import { ApiProperty } from '@nestjs/swagger';

export class UpdateCampaignDto{
  @ApiProperty()
  id?: number;
  @ApiProperty()
  customerEmail?:string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  status?:number;
  @ApiProperty()
  startDate?: number;
  @ApiProperty()
  endDate?: number;
  @ApiProperty()
  feedback?: string;
}
