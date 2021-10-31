import {ApiProperty} from "@nestjs/swagger";

export class UpdateReportMediaDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  reportID: number;
  @ApiProperty()
  url?: string;
  @ApiProperty()
  type?: number;
  @ApiProperty()
  createDate?: number;
}
