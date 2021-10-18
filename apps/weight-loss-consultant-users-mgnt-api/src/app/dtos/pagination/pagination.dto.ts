import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  roleFilter? : string;
  @ApiProperty()
  genderFilter? : string;
  @ApiProperty()
  page? : number;
  @ApiProperty()
  limit? : number;
  @ApiProperty()
  sortBy? : string;
  @ApiProperty()
  order? : string;
  @ApiProperty()
  searchValue? : string;
  @ApiProperty()
  status? : string; //if no status is select, default is empty string
  @ApiProperty()
  rating? : string;
  @ApiProperty()
  yearOfExp? : string; //if no yearOfExp is select, default is empty string
}
