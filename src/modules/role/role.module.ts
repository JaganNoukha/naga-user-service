import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DBServicesModule } from '../../common/repository/repository-services.module';

@Module({
  imports: [
    DBServicesModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
