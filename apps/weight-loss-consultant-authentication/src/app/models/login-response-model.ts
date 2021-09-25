import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseModel{
  @ApiProperty()
  private accessToken: string;
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
