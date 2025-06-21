import { Injectable, NotFoundException } from '@nestjs/common';
import { IMongoDBServices } from 'src/common/repository/mongodb-repository/abstract.repository';
import { CreateRoleDto } from './dto/create.role.dto';
import { UpdateRoleDto } from './dto/update.role.dto';
import { generateUniqueId } from '../../common/utils/nanoid.util';

@Injectable()
export class RoleService {
  constructor(private readonly dbServices: IMongoDBServices) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleId = generateUniqueId();
    const role = {
      roleId,
      ...createRoleDto,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.dbServices.role.create(role);
  }

  async findAll() {
    return this.dbServices.role.find({});
  }

  async findOne(id: string) {
    const role = await this.dbServices.role.findOne({ roleId: id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.dbServices.role.findOneAndUpdate(
      { roleId: id },
      { ...updateRoleDto, updatedAt: new Date() },
      { new: true }
    );
  }

  async remove(id: string) {
    const role = await this.dbServices.role.findOne({ roleId: id });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return await this.dbServices.role.findOneAndUpdate(
      { roleId: id },
      { isDeleted: true },
      { new: true }
    );
  }
}
