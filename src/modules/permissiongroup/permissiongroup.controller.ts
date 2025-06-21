import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PermissionGroupService } from './permissiongroup.service';
import { CreatePermissionGroupDto } from './dto/create.permissiongroup';
import { UpdatePermissionGroupDto } from './dto/update.permissiongroup.dto';

@Controller('permissiongroup')
export class PermissionGroupController {
    constructor(private readonly permissionGroupService: PermissionGroupService) { }

    // POST: Create a new permission group
    @Post()
    async create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
        return this.permissionGroupService.create(createPermissionGroupDto);
    }

    // GET: Get all permission groups
    @Get()
    async findAll() {
        return this.permissionGroupService.findAll();
    }

    // GET: Get a specific permission group by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.permissionGroupService.findOne(id);
    }

    @Patch(':id')
    updateById(
        @Param('id') id: string,
        @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
    ) {
        return this.permissionGroupService.updateById(id, updatePermissionGroupDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.permissionGroupService.remove(id);
    }
}
