import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { from, Observable } from 'rxjs';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async get<T>(key: string): Promise<T> {
    return await this.cache.get<T>(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.cache.set<T>(key, value);
  }

  async del<T>(key: string): Promise<void> {
    await this.cache.del(key);
  }

  del$<T>(key: string): Observable<void> {
    return from(this.cache.del(key));
  }
}
