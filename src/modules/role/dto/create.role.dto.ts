import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    example: 'Admin'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the role',
    example: 'Administrator role with full access',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Company ID',
    example: '507f1f77bcf86cd799439011'
  })
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({
    description: 'Division ID',
    example: '507f1f77bcf86cd799439012',
    required: false
  })
  @IsMongoId()
  @IsOptional()
  divisionId?: string;

  @ApiProperty({
    description: 'Brand ID',
    example: '507f1f77bcf86cd799439013',
    required: false
  })
  @IsMongoId()
  @IsOptional()
  brandId?: string;

  @ApiProperty({
    description: 'Array of permission IDs',
    example: ['507f1f77bcf86cd799439014', '507f1f77bcf86cd799439015'],
    required: false
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  permissions?: string[];
}
