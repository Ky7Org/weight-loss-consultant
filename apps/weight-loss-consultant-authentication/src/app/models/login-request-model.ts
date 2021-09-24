import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestModel {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
