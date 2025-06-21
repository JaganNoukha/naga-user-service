import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create.role.dto';
import { UpdateRoleDto } from './dto/update.role.dto';

@Controller('roles')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) {}

    // POST: Create a new role
    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    // GET: Get all roles
    @Get()
    findAll() {
        return this.roleService.findAll();
    }

    // GET: Get a specific role by ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleService.remove(id);
    }
}
