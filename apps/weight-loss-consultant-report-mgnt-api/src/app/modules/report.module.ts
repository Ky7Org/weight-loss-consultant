import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {
  CONTRACT_MANAGEMENT_SERVICE_NAME, CONTRACT_MANAGEMENT_SERVICE_PORT,
  HOST,
  REPORT_MANAGEMENT_SERVICE_NAME,
  REPORT_MANAGEMENT_SERVICE_PORT
} from '../../../../../constant';
import {ReportRepository} from "../repositories/report.repository";
import {ReportService} from "../services/report.service";
import {ReportMapper} from "../mappers/report/report.mapper";
import {ReportController} from "../controllers/report.controller";
import {ReportMediaRepository} from "../repositories/report-media.repository";
import {ReportMediaMapper} from "../mappers/report-media/report-media.mapper";


@Module({
  imports: [ClientsModule.register([
    {
      name: REPORT_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: REPORT_MANAGEMENT_SERVICE_PORT
      }
    },
    {
      name: CONTRACT_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: CONTRACT_MANAGEMENT_SERVICE_PORT
      }
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
