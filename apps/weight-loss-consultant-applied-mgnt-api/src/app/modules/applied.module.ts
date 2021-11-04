import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ClientsModule } from '@nestjs/microservices';
import { AppliedRepository } from '../repositories/applied.repository';
import { AppliedService } from '../services/applied.service';
import { AppliedMapper } from '../mappers/applied.mapper';
import { AppliedController } from '../controllers/applied.controller';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppliedRepository
    ]),
    ClientsModule.register([
      {
        ...KAFKA_SERVICE,
        name: 'SERVER',
      }
    ])
  ],
  providers: [
    AppliedService, AppliedMapper,
  ],
  exports: [
    AppliedService, AppliedMapper,
  ],
  controllers: [AppliedController]
})

export class AppliedModule {

}
