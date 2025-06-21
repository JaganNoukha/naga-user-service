import { Injectable, NotFoundException } from '@nestjs/common';
import { IMongoDBServices } from 'src/common/repository/mongodb-repository/abstract.repository';
import { CreatePermissionDto } from './dto/create.permission';
import { UpdatePermissionDto } from './dto/update.permission.dto';
import { generateUniqueId } from '../../common/utils/nanoid.util';

@Injectable()
export class PermissionService {
  constructor(private readonly mongoDBServices: IMongoDBServices) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permissionId = generateUniqueId();
    const permission = {
      permissionId,
      ...createPermissionDto,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.mongoDBServices.permission.create(permission);
  }

  async findAll() {
    return this.mongoDBServices.permission.find({});
  }

  async findOne(id: string) {
    const permission = await this.mongoDBServices.permission.findOne({ permissionId: id });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOne(id);
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return this.mongoDBServices.permission.findOneAndUpdate(
      { permissionId: id },
      { ...updatePermissionDto, updatedAt: new Date() },
      { new: true }
    );
  }

  async remove(id: string) {
    const permission = await this.findOne(id);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return await this.mongoDBServices.permission.findOneAndUpdate(
      { permissionId: id },
      { isDeleted: true },
      { new: true }
    );
  }
}
