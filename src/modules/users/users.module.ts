import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DBServicesModule } from '../../common/repository/repository-services.module';
import { HttpClientModule } from '../../common/inter-service-communication/http-client.module';
import { PaginationModule } from '../../common/shared/pagination/pagination.module';

@Module({
  imports: [
    DBServicesModule,
    HttpClientModule,
    PaginationModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {} 