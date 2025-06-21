import { PartialType } from '@nestjs/swagger';
import { CreatePermissionGroupDto } from './create.permissiongroup';

export class UpdatePermissionGroupDto extends PartialType(CreatePermissionGroupDto) { }