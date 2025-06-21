import { Module } from '@nestjs/common';
import { PermissionGroupService } from './permissiongroup.service';
import { PermissionGroupController } from './permissiongroup.controller';
import { DBServicesModule } from '../../common/repository/repository-services.module';
import { HttpClientModule } from '../../common/inter-service-communication/http-client.module';

@Module({
  imports: [
    DBServicesModule,
    HttpClientModule,
  ],
  controllers: [PermissionGroupController],
  providers: [PermissionGroupService],
  exports: [PermissionGroupService],
})
export class PermissionGroupModule {}
