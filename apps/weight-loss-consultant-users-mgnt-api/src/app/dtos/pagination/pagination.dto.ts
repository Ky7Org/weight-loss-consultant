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
}
