import { IsString, IsEnum, IsOptional, IsDateString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IUser, UserStatus, UserType, ILocation, IUserAddress, IWarehouse } from '../../../common/interfaces/user.interface';

class LocationDto implements ILocation {
  @IsString()
  @IsNotEmpty()
  type: 'Point';

  @IsArray()
  @IsNotEmpty()
  coordinates: [number, number];
}

class UserAddressDto {
  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}

class WarehouseDto implements IWarehouse {
  @IsString()
  @IsNotEmpty()
  warehouseId: string;
}

export class CreateUserDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  employeeCode?: string;

  @IsOptional()
  @IsString()
  imeiNo?: string;

  @IsOptional()
  @IsString()
  gradeId?: string;

  @IsEnum(UserType)
  userType: UserType;

  @IsOptional()
  @IsString()
  roleId?: string;

  @IsOptional()
  @IsString()
  reportingTo?: string;

  @ValidateNested()
  @Type(() => UserAddressDto)
  userAddress: UserAddressDto;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsOptional()
  @IsDateString()
  doj?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  permissionGroup?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WarehouseDto)
  warehouse: WarehouseDto[];

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  password?: string;
} 