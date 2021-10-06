class PaginationDto {
  roleFilter? : string;
  genderFilter? : string;
  page? : number;
  limit? : number;
  sortBy? : string;
  order? : string;
}

export type SearchPaginationPayloadType = {
  pagination: PaginationDto,
  search: string,
}
