import { Controller, Get, Param, Post, Body, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Post as PostEntity } from '../posts/entities/post.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'The list of users', type: User, isArray: true })
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'The user', type: User })
  @ApiResponse({ status: 403, description: 'The user was not found' })
  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get the profile of a user by id' })
  @ApiResponse({ status: 200, description: 'The profile of the user', type: Profile })
  @ApiResponse({ status: 404, description: 'The user was not found' })
  @Get(':id/profile')
  getProfileByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfileByUserId(id);
  }

  @ApiOperation({ summary: 'Get all posts of a user by id' })
  @ApiResponse({ status: 200, description: 'The list of posts of the user', type: PostEntity, isArray: true })
  @ApiResponse({ status: 404, description: 'The user was not found' })
  @Get(':id/posts')
  getPostsByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getPostsByUserId(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created', type: User })
  @ApiResponse({ status: 400, description: 'Error creating the user (e.g. the email is already in use)' })
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted' })
  @ApiResponse({ status: 400, description: 'Error deleting the user' })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @ApiOperation({ summary: 'Update a user by id' })
  @ApiResponse({ status: 200, description: 'The updated user', type: User })
  @ApiResponse({ status: 400, description: 'Error updating the user' })
  @ApiResponse({ status: 404, description: 'The user was not found' })
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id, changes);
  }
}
