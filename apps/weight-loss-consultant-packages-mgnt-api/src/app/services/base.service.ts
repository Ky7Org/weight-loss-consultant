import { BaseEntity, DeleteResult, Repository } from 'typeorm';
import { EntityId } from 'typeorm/browser/repository/EntityId';
import { IBaseService } from './i.base.service';

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
  protected readonly repository: R

  constructor(repository: R) {
    this.repository = repository;
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return Promise.resolve(undefined);
  }

  findById(id: EntityId) {
    return this.repository.findOne(id);
  }

  findByIds(ids: [EntityId]) {
    return this.repository.findByIds(ids);
  }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    //return which one was updated
    return this.findById(id);
  }
}
