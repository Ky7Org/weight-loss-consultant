import {ApiProperty} from "@nestjs/swagger";

export class LoginResponse {
  @ApiProperty()
  accessToken? : string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  role: string;
}
