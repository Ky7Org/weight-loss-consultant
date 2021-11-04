import { Module } from '@nestjs/common';
import { AppliedService } from '../services/applied.service';
import { ApplyController } from '../controllers/applies-management/apply.controller';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';

@Module({
  imports: [ClientsModule.register([
    {
      ...KAFKA_SERVICE,
      name: 'SERVER',
    }
  ]),],
  providers: [AppliedService],
  exports: [AppliedService],
  controllers: [ApplyController]
})

export class AppliedModule {

}
