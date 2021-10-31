import {ApiProperty} from "@nestjs/swagger";

export class UpdateReportMediaDto {
  @ApiProperty()
  reportID: number;
  @ApiProperty()
  url?: string;
  @ApiProperty()
  type?: number;
}
