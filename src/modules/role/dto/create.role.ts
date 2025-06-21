import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  permissions?: string[];
} 