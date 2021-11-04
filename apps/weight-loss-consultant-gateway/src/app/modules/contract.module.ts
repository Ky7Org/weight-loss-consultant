import { Module } from '@nestjs/common';
import { ContractService } from '../services/contract.service';
import { ContractController } from '../controllers/contracts-management/contract.controller';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';

@Module({
  imports: [ClientsModule.register([
    {
      ...KAFKA_SERVICE,
      name: 'SERVER',
    }
  ]),],
  providers: [ContractService],
  exports: [ContractService],
  controllers: [ContractController]
})

export class ContractModule {

}
