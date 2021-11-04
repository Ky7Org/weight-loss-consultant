import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractRepository } from '../repositories/contract.repository';
import { ContractMapper } from '../mappers/health-info.mapper';
import { ContractService } from '../services/impls/contract.service';
import { ClientsModule } from '@nestjs/microservices';
import { ContractController } from '../controllers/contract.controller';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContractRepository
    ]),
    ClientsModule.register([
      {
        ...KAFKA_SERVICE,
        name: 'SERVER',
      }
    ])
  ],
  providers: [
    ContractService, ContractMapper,
  ],
  exports: [
    ContractService, ContractMapper,
  ],
  controllers: [ContractController]
})

export class ContractModule {

}
