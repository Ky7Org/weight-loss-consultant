import { BaseService } from './base/base.service';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';
import { Injectable } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { CustomerMapper } from '../mappers/customer.mapper';

@Injectable()
export class CustomerService extends BaseService<CustomerEntity, CustomerRepository> {
  constructor(repository: CustomerRepository, private readonly customerMapper: CustomerMapper) {
    super(repository);
  }

  async findByEmail(email: string): Promise<CustomerDTO> {
    const entity = await this.repository.findOneOrFail({ email: email });
    const dto = await this.customerMapper.mapEntityToDTO(entity);
    return dto;
  }


}
