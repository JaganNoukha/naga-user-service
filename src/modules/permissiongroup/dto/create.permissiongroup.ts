import { IsString, IsNotEmpty, IsArray, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { UserType } from 'src/common/interfaces/user.interface';

export class CreatePermissionGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsString({ each: true })
  permissions: string[];

  @IsString()
  @IsOptional()
  roleId: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;
  
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
} 