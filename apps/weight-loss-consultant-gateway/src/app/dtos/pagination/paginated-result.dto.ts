import { ApiProperty } from '@nestjs/swagger';
import { AdminEntity } from '../../entities/admin.entity';
import { CustomerEntity } from '../../entities/customer.entity';
import { TrainerEntity } from '../../entities/trainer.entity';
export class PaginatedResultDto {
  @ApiProperty()
  data: AdminEntity[] | CustomerEntity[] | TrainerEntity[]
  @ApiProperty()
  page: number
  @ApiProperty()
  limit: number
  @ApiProperty()
  totalCount: number
}
