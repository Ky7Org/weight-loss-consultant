import { Injectable, Logger } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { TrainerService } from './trainer.service';
import { AccountDTO } from '../dtos/acount.dto';
import { EntityNotFoundError } from 'typeorm';
import { Role } from '../../constant';
import { AdminService } from './admin.service';

@Injectable()
export class AccountService {
  private logger = new Logger(AccountService.name);

  constructor(private readonly customerService: CustomerService,
              private readonly trainerService: TrainerService,
              private readonly adminService: AdminService) {
  }

  async findAccountByEmail(email: string): Promise<AccountDTO> {
    try {
      const dto = await this.customerService.findByEmail(email);
      dto.role = Role.customer;
      return dto;
    } catch (e) {
      //continue
    }
    try {
      const dto = await this.trainerService.findByEmail(email);
      dto.role = Role.trainer;
      return dto;
    } catch (e) {
      //continue
    }
    try {
      const dto = await this.adminService.findByEmail(email);
      dto.role = Role.admin;
      return dto;
    } catch (e) {
      //continue
    }
    throw new EntityNotFoundError(null, null);
  }

  async updatePassword(accountDTO: AccountDTO, newPassword: string) {
    switch (accountDTO.role) {
      case Role.trainer:
        this.trainerService.update(accountDTO.email, { password: newPassword });
        break;
      case Role.customer:
        this.customerService.update(accountDTO.email, { password: newPassword });
        break;
      case Role.admin:
        this.adminService.update(accountDTO.email, { password: newPassword });
    }
  }
}
