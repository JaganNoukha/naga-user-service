import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    // POST: Create a new user
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // GET: Get all users
    @Get()
    findAllUsers(
      @Query('skip') skip: number = 0,
      @Query('limit') limit: number = 10,
      @Query('filter') filter: string = '{}',
    ) {
      let parsedFilter;
      try {
        parsedFilter = JSON.parse(filter);
      } catch (e) {
        parsedFilter = {};
      }
      return this.usersService.findAllUsers(skip, limit, parsedFilter);
    }

    // GET: Get a specific user by ID
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Get('cognito/fetch')
    findUserForCognito(@Query('filter') filter: {}) {
        return this.usersService.findUserForCognito(filter);
    }

    @Get('phone/:phoneNumber')
    findByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
        return this.usersService.findByPhoneNumber(phoneNumber);
    }

    @Patch(':id')
    updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateById(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

} 