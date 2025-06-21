import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create.permission';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) { }