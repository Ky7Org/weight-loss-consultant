import { BaseService } from './base/base.service';
import { Injectable, Logger } from '@nestjs/common';
import { AdminEntity } from '../entities/admin.entity';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminMapper } from '../mappers/admin.mapper';
import { RedisCacheService } from './redis-cache.service';
import { AdminDTO } from '../dtos/admin.dto';

@Injectable()
export class AdminService extends BaseService<AdminEntity, AdminRepository> {
  private logger = new Logger(AdminService.name);
  constructor(repository: AdminRepository,
              private readonly adminMapper: AdminMapper,
              private readonly redisCacheService: RedisCacheService) {
    super(repository);
  }

  async findByEmail(email: string): Promise<AdminDTO> {
    let dto = await this.redisCacheService.get<AdminDTO>(email);
    if (dto === null){
      const entity = await this.repository.findOneOrFail({ email: email });
      dto = await this.adminMapper.mapEntityToDTO(entity);
      await this.redisCacheService.set<AdminDTO>(email, dto);
    }
    return dto;
  }


}
