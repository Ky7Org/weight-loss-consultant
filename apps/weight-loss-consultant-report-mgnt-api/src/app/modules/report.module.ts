import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ReportRepository } from '../repositories/report.repository';
import { ReportService } from '../services/report.service';
import { ReportMapper } from '../mappers/report/report.mapper';
import { ReportController } from '../controllers/report.controller';
import { ReportMediaRepository } from '../repositories/report-media.repository';
import { ReportMediaMapper } from '../mappers/report-media/report-media.mapper';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';


@Module({
  imports: [ClientsModule.register([
    {
      ...KAFKA_SERVICE,
      name: 'SERVER'
    }
  ]),
    TypeOrmModule.forFeature([ReportRepository, ReportMediaRepository])],
  providers: [ReportService, ReportMapper, ReportMediaMapper],
  exports: [
    ReportService, ReportMapper, ReportMediaMapper
  ],
  controllers: [ReportController]
})
export class ReportModule {

}
