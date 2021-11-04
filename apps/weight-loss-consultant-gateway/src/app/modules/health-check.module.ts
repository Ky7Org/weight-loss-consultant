import { Module } from '@nestjs/common';
import { HealthCheckController } from '../controllers/health-info-management/health-check.controller';
import { HealthInfoService } from '../services/health.service';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';

@Module({
  imports: [ClientsModule.register([
    {
      ...KAFKA_SERVICE,
      name: 'SERVER',
    }
  ]),],
  providers: [HealthInfoService],
  exports: [HealthInfoService],
  controllers: [HealthCheckController]
})

export class HealthCheckModule {

}
