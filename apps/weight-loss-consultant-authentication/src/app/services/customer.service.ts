import { BaseService } from './base/base.service';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService extends BaseService<CustomerEntity, CustomerRepository> {
  constructor(repository: CustomerRepository) {
    super(repository);
  }

  findByEmail(email: string): Promise<CustomerEntity | null> {
    return this.repository.findOne({ email: email });
  }


}
