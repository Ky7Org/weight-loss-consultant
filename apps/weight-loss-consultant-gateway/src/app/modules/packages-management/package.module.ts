import {Module} from '@nestjs/common';
import {PackageController} from '../../controllers/packages-management/package.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {HOST, PACKAGES_MANAGEMENT_SERVICE_NAME, PACKAGES_MANAGEMENT_SERVICE_PORT} from '../../../../../../constant';
import {PackageService} from "../../services/packages-management/package.service";


@Module({
  imports: [ClientsModule.register([
    {
      name: PACKAGES_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: PACKAGES_MANAGEMENT_SERVICE_PORT
      }
    }])
  ],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService]
})
export class PackageModule {
}
