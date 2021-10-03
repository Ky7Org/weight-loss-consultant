import {AdminEntity} from "../../entities/admin.entity";
import {CustomerEntity} from "../../entities/customer.entity";
import {TrainerEntity} from "../../entities/trainer.entity";

export class PaginatedResultDto {
  data: AdminEntity[] | CustomerEntity[] | TrainerEntity[]
  page: number
  limit: number
  totalCount: number
}
