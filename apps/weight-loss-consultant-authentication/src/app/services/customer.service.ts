import { BaseService } from './base/base.service';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';
import { Injectable } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { CustomerMapper } from '../mappers/customer.mapper';
import { RedisCacheService } from './redis-cache.service';

@Injectable()
export class CustomerService extends BaseService<CustomerEntity, CustomerRepository> {
  constructor(repository: CustomerRepository,
              private readonly customerMapper: CustomerMapper,
              private readonly redisCacheService: RedisCacheService) {
    super(repository);
  }

  async findByEmail(email: string): Promise<CustomerDTO> {
    let dto = await this.redisCacheService.get<CustomerDTO>(email);
    if (dto === null){
      const entity = await this.repository.findOneOrFail({ email: email });
      dto = await this.customerMapper.mapEntityToDTO(entity);
      await this.redisCacheService.set<CustomerDTO>(email, dto);
    }
    return dto;
  }


}
