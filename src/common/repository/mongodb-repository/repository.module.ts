import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IMongoDBServices } from './abstract.repository';
import { MongoDBServices } from './repository.service';
import { Role, RoleSchema } from 'src/modules/role/entity/role.entity';
import { Permission, PermissionSchema } from 'src/modules/permission/entity/permission.entity';
import { PermissionGroup, PermissionGroupSchema } from 'src/modules/permissiongroup/entity/permissiongroup.entity';
import { User, UserSchema } from 'src/modules/users/entity/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: PermissionGroup.name, schema: PermissionGroupSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: IMongoDBServices,  
      useClass: MongoDBServices,
    },
  ],
  exports: [IMongoDBServices],
})
export class MongoDBServicesModule {
  constructor() {
    console.log('MongoDBServicesModule loaded');
  }
}
