import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { DBServicesModule } from '../../common/repository/repository-services.module';

@Module({
  imports: [
    DBServicesModule,
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
