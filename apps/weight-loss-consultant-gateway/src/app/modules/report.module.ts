import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ReportController } from '../controllers/report-management/report.controller';
import { ReportService } from '../services/reports-management/report.service';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';


@Module({
  imports: [ClientsModule.register([
    {
      ...KAFKA_SERVICE,
      name: 'SERVER',
    }
  ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService]
})
export class ReportModule {
}
