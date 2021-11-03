import { Module } from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {
  CONTRACT_MANAGEMENT_SERVICE_NAME,
  CONTRACT_MANAGEMENT_SERVICE_PORT,
  HOST,
} from "../../../../../constant";
import {ContractService} from "../services/contract.service";
import {ContractController} from "../controllers/contracts-management/contract.controller";

@Module({
  imports: [],
  providers: [ContractService],
  exports: [ContractService],
  controllers: [ContractController]
})

export class ContractModule {

}
