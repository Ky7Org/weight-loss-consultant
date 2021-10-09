import {Module} from '@nestjs/common';
import {AdminController} from '../../controllers/users-management/admin.controller';


@Module({
  imports: [],
  controllers: [AdminController],
  providers: [],
  exports: []
})
export class AdminModule {}
