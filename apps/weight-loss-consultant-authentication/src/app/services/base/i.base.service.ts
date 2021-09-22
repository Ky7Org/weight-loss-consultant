import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';


export interface IBaseService<T> {
  index(): Promise<T[]>;

  findById(id: EntityId);

  findByIds(ids: [EntityId]);

  store(data: any): Promise<T>;

  update(id: EntityId, data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
