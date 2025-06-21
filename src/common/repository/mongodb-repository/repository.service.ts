import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMongoDBServices } from './abstract.repository';
import { IMongoRepository } from './repository.abstract';
import { MongoRepository } from './repository';
import { Role } from 'src/modules/role/entity/role.entity';
import { RoleDocument } from 'src/modules/role/entity/role.entity';
import { IRole } from 'src/modules/role/interfaces/role.interface';
import { Permission } from 'src/modules/permission/entity/permission.entity';
import { PermissionDocument } from 'src/modules/permission/entity/permission.entity';
import { IPermission } from 'src/modules/permission/interfaces/permission.interface';
import { PermissionGroup } from 'src/modules/permissiongroup/entity/permissiongroup.entity';
import { PermissionGroupDocument } from 'src/modules/permissiongroup/entity/permissiongroup.entity';
import { IPermissionGroup } from 'src/common/interfaces/permissiongroup.interface';
import { User, UserDocument } from 'src/modules/users/entity/user.entity';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class MongoDBServices implements IMongoDBServices {
  role: IMongoRepository<RoleDocument, IRole, RoleDocument>;
  permission: IMongoRepository<PermissionDocument, IPermission, PermissionDocument>;
  permissionGroup: IMongoRepository<PermissionGroupDocument, IPermissionGroup, PermissionGroupDocument>;
  user: IMongoRepository<UserDocument, IUser, UserDocument>;
  constructor(
    @InjectModel(Role.name)
    private roleRepository: Model<RoleDocument>,
    @InjectModel(Permission.name)
    private permissionRepository: Model<PermissionDocument>,
    @InjectModel(PermissionGroup.name)
    private permissionGroupRepository: Model<PermissionGroupDocument>,
    @InjectModel(User.name)
    private userRepository: Model<UserDocument>,
  ) {
    console.log('MongoDBServices loaded');
  }

  onApplicationBootstrap() {
    this.role = new MongoRepository<Role, IRole, RoleDocument>(
      this.roleRepository,
    );
    this.permission = new MongoRepository<Permission, IPermission, PermissionDocument>(
      this.permissionRepository,
    );
    this.permissionGroup = new MongoRepository<PermissionGroup, IPermissionGroup, PermissionGroupDocument>(
      this.permissionGroupRepository,
    );
    this.user = new MongoRepository<User, IUser, UserDocument>(
      this.userRepository,
    );
    console.log('<== Mongo DB repositories got initialised ==>');
  }
}
