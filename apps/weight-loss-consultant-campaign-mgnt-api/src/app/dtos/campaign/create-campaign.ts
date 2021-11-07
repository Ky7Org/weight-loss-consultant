import { ApiProperty } from '@nestjs/swagger';
import {Column} from "typeorm";

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
  @ApiProperty()
  targetWeight?: number;
  @ApiProperty()
  currentWeight?: number;
  @ApiProperty()
  spendTimeForTraining?: number;
  @ApiProperty()
  sessionLength?: number;
}
