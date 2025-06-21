import { IMongoRepository } from './repository.abstract';
import { Role, RoleDocument } from 'src/modules/role/entity/role.entity';
import { IRole } from 'src/modules/role/interfaces/role.interface';
import { Permission, PermissionDocument } from 'src/modules/permission/entity/permission.entity';
import { IPermission } from 'src/modules/permission/interfaces/permission.interface';
import { PermissionGroup, PermissionGroupDocument } from 'src/modules/permissiongroup/entity/permissiongroup.entity';
import { IPermissionGroup } from 'src/common/interfaces/permissiongroup.interface';
import { IUser } from 'src/common/interfaces/user.interface';
import { User, UserDocument } from 'src/modules/users/entity/user.entity';

export abstract class IMongoDBServices {
    abstract role: IMongoRepository<Role, IRole, RoleDocument>;
    abstract permission: IMongoRepository<Permission, IPermission, PermissionDocument>;
    abstract permissionGroup: IMongoRepository<PermissionGroup, IPermissionGroup, PermissionGroupDocument>;
    abstract user: IMongoRepository<User, IUser, UserDocument>;
}