import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {HOST, REPORT_MANAGEMENT_SERVICE_NAME, REPORT_MANAGEMENT_SERVICE_PORT} from '../../../../../constant';
import {ReportController} from "../controllers/report-management/report.controller";
import {ReportService} from "../services/report.service";


@Module({
  imports: [ClientsModule.register([
    {
      name: REPORT_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: REPORT_MANAGEMENT_SERVICE_PORT
      }
    }])
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService]
})
export class ReportModule {
}
