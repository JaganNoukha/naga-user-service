import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { IMongoDBServices } from 'src/common/repository/mongodb-repository/abstract.repository';
import { CreatePermissionGroupDto } from './dto/create.permissiongroup';
import { UpdatePermissionGroupDto } from './dto/update.permissiongroup.dto';
import { generateUniqueId } from '../../common/utils/nanoid.util';
import { HttpClientService } from 'src/common/inter-service-communication/http-client.service';
import { UserType } from 'src/common/interfaces/user.interface';
@Injectable()
export class PermissionGroupService {
  constructor(private readonly mongoDBServices: IMongoDBServices,
    private readonly httpClientService: HttpClientService,
  ) {}

  private async validatePermissions(permissionIds: string[]): Promise<string[]> {
    try {
      const invalidPermissions: string[] = [];
      for (const permissionId of permissionIds) {
        const permission = await this.mongoDBServices.permission.findOne({ 
          permissionId: permissionId 
        });
        if (!permission) {
          invalidPermissions.push(permissionId);
        }
      }
      return invalidPermissions;
    } catch (error) {
      throw new BadRequestException('Failed to validate permissions');
    }
  }

  async create(createPermissionGroup: CreatePermissionGroupDto) {
    // Validate permissions
    if (createPermissionGroup.permissions && createPermissionGroup.permissions.length > 0) {
      const invalidPermissions = await this.validatePermissions(createPermissionGroup.permissions);
      if (invalidPermissions.length > 0) {
        throw new BadRequestException(
          `Invalid permission IDs: ${invalidPermissions.join(', ')}`
        );
      }

      if(createPermissionGroup.userType === UserType.PERMANENT && !createPermissionGroup.roleId){
        throw new BadRequestException('Role ID is required for permanent users');
      }

          // Validate role
    if (createPermissionGroup.roleId) {
      const isValidRole = await this.validateRole(createPermissionGroup.roleId);
      if (!isValidRole) {
        throw new BadRequestException(`Role with ID ${createPermissionGroup.roleId} not found`);
      }
    }
    }
    return this.mongoDBServices.permissionGroup.create(createPermissionGroup);
  }

  async findAll() {
    return this.mongoDBServices.permissionGroup.find({});
  }

  async findOne(id: string) {
    return this.mongoDBServices.permissionGroup.findOne({ permissionGroupId: id });
  }

  async updateById(permissionGroupId: string, updatePermissionGroupDto: UpdatePermissionGroupDto) {
    // Check if permission group exists
    const existingGroup = await this.mongoDBServices.permissionGroup.findOne({ 
      permissionGroupId
    });
    if (!existingGroup) {
      throw new NotFoundException(`Permission group with permissionGroupId ${permissionGroupId} not found`);
    }

    // Validate permissions if being updated
    if (updatePermissionGroupDto.permissions && updatePermissionGroupDto.permissions.length > 0) {
      const invalidPermissions = await this.validatePermissions(updatePermissionGroupDto.permissions);
      if (invalidPermissions.length > 0) {
        throw new BadRequestException(
          `Invalid permission IDs: ${invalidPermissions.join(', ')}`
        );
      }
    }

    return this.mongoDBServices.permissionGroup.findOneAndUpdate(
      { permissionGroupId },
      { 
        ...updatePermissionGroupDto,
        updatedAt: new Date()
      },
      { new: true }
    );
  }

  async remove(id: string) {
    const permissionGroup = await this.mongoDBServices.permissionGroup.findOne({ permissionGroupId: id });
    if (!permissionGroup) {
      throw new NotFoundException('Permission group not found');
    }
    return await this.mongoDBServices.permissionGroup.findOneAndUpdate(
      { permissionGroupId: id },
      { isDeleted: true },
      { new: true }
    );
  }

  private async validateRole(roleId: string): Promise<boolean> {
    try {
      const response = await this.httpClientService.get(
        'NAGA_MDM_SERVICE',
        `/master/role/data/${roleId}`,
        {}
      );
      return !!response;
    } catch (error) {
      return false;
    }
  }
}
