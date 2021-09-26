import { BaseService } from './base/base.service';
import { Injectable } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { AdminEntity } from '../entities/admin.entity';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminMapper } from '../mappers/admin.mapper';

@Injectable()
export class AdminService extends BaseService<AdminEntity, AdminRepository> {
  constructor(repository: AdminRepository, private readonly adminMapper: AdminMapper) {
    super(repository);
  }

  async findByEmail(email: string): Promise<CustomerDTO> {
    const entity = await this.repository.findOneOrFail({ email: email });
    const dto = await this.adminMapper.mapEntityToDTO(entity);
    return dto;
  }


}
