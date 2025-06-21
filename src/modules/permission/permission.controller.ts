import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create.permission';
import { UpdatePermissionDto } from './dto/update.permission.dto';

@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    // POST: Create a new permission
    @Post()
    async create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionService.create(createPermissionDto);
    }

    // GET: Get all permissions
    @Get()
    async findAll() {
        return this.permissionService.findAll();
    }

    // GET: Get a specific permission by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.permissionService.findOne(id);
    }

    // PUT: Update a permission by ID/
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        return this.permissionService.update(id, updatePermissionDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.permissionService.remove(id);
    }
}
