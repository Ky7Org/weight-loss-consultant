import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT } from '../../../../../constant';
import { SearchController } from '../controllers/users-management/search.controller';
import { SearchService } from '../services/search.service';


@Module({
  imports: [ClientsModule.register([
    {
      name: USERS_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: USERS_MANAGEMENT_SERVICE_PORT
      }
    }])],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule {}
