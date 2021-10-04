import {ApiProperty} from "@nestjs/swagger";

export class CreateCampaignDto {
  @ApiProperty()
  customerEmail?:string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  startDate?: number;
  @ApiProperty()
  endDate?: number;
  @ApiProperty()
  feedback?: string;
}
