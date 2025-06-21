import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IMongoDBServices } from 'src/common/repository/mongodb-repository/abstract.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { HttpClientService } from '../../common/inter-service-communication/http-client.service';
import { IPaginatedResult } from 'src/common/interfaces/paginated-result.interface';
import { IUser } from 'src/common/interfaces/user.interface';
import { PaginationService } from 'src/common/shared/pagination/pagination.service';
@Injectable()
export class UsersService {
  constructor(
    private readonly dbServices: IMongoDBServices,
    private readonly httpClientService: HttpClientService,
    private readonly paginationService: PaginationService,
  ) { }



  async create(createUserDto: CreateUserDto) {
    // Validate permission groups
    if (createUserDto.permissionGroup && createUserDto.permissionGroup.length > 0) {
      const invalidGroups = await this.validatePermissionGroups(createUserDto.permissionGroup);
      if (invalidGroups.length > 0) {
        throw new BadRequestException(
          `Invalid permission group IDs: ${invalidGroups.join(', ')}`
        );
      }
    }

    // Validate role
    if (createUserDto.roleId) {
      const isValidRole = await this.validateRole(createUserDto.roleId);
      if (!isValidRole) {
        throw new BadRequestException(`Role with ID ${createUserDto.roleId} not found`);
      }
    }

    // Validate role
    if (createUserDto.gradeId) {
      const isValidGrade = await this.validateGrade(createUserDto.gradeId);
      if (!isValidGrade) {
        throw new BadRequestException(`Grade with ID ${createUserDto.gradeId} not found`);
      }
    }

    // Validate reportingTo
    if (createUserDto.reportingTo) {
      const isValidReportingTo = await this.validateReportingTo(createUserDto.reportingTo);
      if (!isValidReportingTo) {
        throw new BadRequestException(`Reporting manager with employee code ${createUserDto.reportingTo} not found`);
      }
    }

    // Validate warehouses
    if (createUserDto.warehouse && createUserDto.warehouse.length > 0) {
      const warehouseIds = createUserDto.warehouse.map(w => w.warehouseId);
      const invalidWarehouses = await this.validateWarehouses(warehouseIds);

      if (invalidWarehouses.length > 0) {
        throw new BadRequestException(
          `Invalid warehouse IDs: ${invalidWarehouses.join(', ')}`
        );
      }
    }
    await this.httpClientService.post('NAGA_IAM_SERVICE', `/auth/create-user`, createUserDto);
    createUserDto.userName = createUserDto.phoneNumber ? createUserDto.phoneNumber : createUserDto.email;
    return this.dbServices.user.create(createUserDto);
  }

  async findAllUsers(
    skip: number = 0,
    limit: number = 10,
    filter: Record<string, any> = {},
  ): Promise<IPaginatedResult<IUser[]>> {
    filter.isDeleted = { $in: [null, false] }
    return await this.paginationService.findAndPaginate(
      this.dbServices.user,
      'user',
      {
        skip,
        limit,
        filter,
      },
    );
  }

  async findOne(id: string) {
    const user = await this.dbServices.user.findOne({ userId: id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByPhoneNumber(phoneNumber: string) {
    const user = await this.dbServices.user.findOne({ phoneNumber });
    if (!user) {
      throw new NotFoundException(`User with phone number ${phoneNumber} not found`);
    }
    return user;
  }

  async updateById(userId: string, updateUserDto: UpdateUserDto) {

    const userDetail = await this.dbServices.user.findOne({ userId });
    if (!userDetail) {
      throw new NotFoundException(`User with userId ${userId} not found`);
    }
    // Validate permission groups if being updated
    if (updateUserDto.permissionGroup && updateUserDto.permissionGroup.length > 0) {
      const invalidGroups = await this.validatePermissionGroups(updateUserDto.permissionGroup);
      if (invalidGroups.length > 0) {
        throw new BadRequestException(
          `Invalid permission group IDs: ${invalidGroups.join(', ')}`
        );
      }
    }
    // Validate role if being updated
    if (updateUserDto.roleId) {
      const isValidRole = await this.validateRole(updateUserDto.roleId);
      if (!isValidRole) {
        throw new BadRequestException(`Role with ID ${updateUserDto.roleId} not found`);
      }
    }

    // Validate grade if being updated
    if (updateUserDto.gradeId) {
      const isValidGrade = await this.validateGrade(updateUserDto.gradeId);
      if (!isValidGrade) {
        throw new BadRequestException(`Grade with ID ${updateUserDto.gradeId} not found`);
      }
    }

    // Validate reportingTo if being updated
    if (updateUserDto.reportingTo) {
      const isValidReportingTo = await this.validateReportingTo(updateUserDto.reportingTo);
      if (!isValidReportingTo) {
        throw new BadRequestException(`Reporting manager with employee code ${updateUserDto.reportingTo} not found`);
      }
    }

    if(updateUserDto.phoneNumber){
      const user = await this.dbServices.user.findOne({ phoneNumber: updateUserDto.phoneNumber });
      if (user) {
        throw new BadRequestException(`Phone number ${updateUserDto.phoneNumber} already exists`);
      }
      if(updateUserDto.phoneNumber !== userDetail.phoneNumber){
        try {
          await this.httpClientService.post('NAGA_IAM_SERVICE', `/auth/update-phone-number`, 
            {...updateUserDto, oldPhoneNumber: userDetail.phoneNumber, userId: userDetail.userId, password: userDetail.password});
          } catch (error) {
          // If user not found in Cognito, we should still update the phone number in our database
          // but log the error for investigation
          console.error(`Failed to update phone number in Cognito for user ${userDetail.userId}:`, error.message);
        }
      }
    }

    // Validate warehouses if being updated
    if (updateUserDto.warehouse && updateUserDto.warehouse.length > 0) {
      const warehouseIds = updateUserDto.warehouse.map(w => w.warehouseId);
      const invalidWarehouses = await this.validateWarehouses(warehouseIds);

      if (invalidWarehouses.length > 0) {
        throw new BadRequestException(
          `Invalid warehouse IDs: ${invalidWarehouses.join(', ')}`
        );
      }
    }

    return this.dbServices.user.findOneAndUpdate(
      { userId },
      { ...updateUserDto },
      { new: true }
    );
  }

  async remove(id: string) {
    const user = await this.dbServices.user.findOne({ userId: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.dbServices.user.findOneAndUpdate(
      { userId: id },
      { isDeleted: true },
      { new: true }
    );
  }


  private async validatePermissionGroups(permissionGroupIds: string[]): Promise<string[]> {
    try {
      const invalidGroups: string[] = [];
      for (const groupId of permissionGroupIds) {
        const permissionGroup = await this.dbServices.permissionGroup.findOne({
          permissionGroupId: groupId
        });
        if (!permissionGroup) {
          invalidGroups.push(groupId);
        }
      }
      return invalidGroups;
    } catch (error) {
      throw new BadRequestException('Failed to validate permission groups');
    }
  }

  private async validateWarehouses(warehouseIds: string[]): Promise<string[]> {
    try {
      const response: any = await this.httpClientService.get(
        'NAGA_PARTNER_SERVICE',
        '/warehouse',
        {}
      );
      const validWarehouses = response.items.map(warehouse => warehouse.warehouseId);
      return warehouseIds.filter(id => !validWarehouses.includes(id));
    } catch (error) {
      throw new BadRequestException('Failed to validate warehouses');
    }
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

  private async validateGrade(gradeId: string): Promise<boolean> {
    try {
      const response = await this.httpClientService.get(
        'NAGA_MDM_SERVICE',
        `/master/grade/data/${gradeId}`,
        {}
      );
      return !!response;
    } catch (error) {
      return false;
    }
  }

  private async validateReportingTo(employeeCode: string): Promise<boolean> {
    try {
      const user = await this.dbServices.user.findOne({
        employeeCode,
        isDeleted: { $ne: true }
      });
      return !!user;
    } catch (error) {
      return false;
    }
  }

  async findUserForCognito(filter: any) {
    console.log(`val of filter ${JSON.stringify(filter)}`);
    const user = await this.dbServices.user.findOne(filter);
    return user;
  }
} 