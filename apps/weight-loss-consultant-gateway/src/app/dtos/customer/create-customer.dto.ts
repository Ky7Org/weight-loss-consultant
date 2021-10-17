import {ApiProperty} from '@nestjs/swagger';

export class CreateCustDto {

  @ApiProperty({
    description: 'Email of customer, unique',
    minimum: 1,
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Password of customer',
    minimum: 1,
    type: String,

  })
  password: string;

  @ApiProperty({
    description: 'Retype password of customer. must match with password',
    minimum: 1,
    type: String,
  })
  retypePassword: string;
}
