import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesService } from '../services/categories.service';
import { PostsService } from '../services/posts.service';
import { Category } from '../entities/category.entity';
import { Post as PostEntity } from '../entities/post.entity';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postsService: PostsService,
  ) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The category has been successfully created', type: Category })
  @ApiResponse({ status: 409, description: 'A category with this name already exists' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'The list of categories', type: Category, isArray: true })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Get a category by id' })
  @ApiResponse({ status: 200, description: 'The category', type: Category })
  @ApiResponse({ status: 404, description: 'The category was not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Get all posts of a category by id' })
  @ApiResponse({ status: 200, description: 'The list of posts of the category', type: PostEntity, isArray: true })
  @Get(':id/posts')
  getPostsByCategoryId(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostsByCategoryId(id);
  }

  @ApiOperation({ summary: 'Update a category by id' })
  @ApiResponse({ status: 200, description: 'The updated category', type: Category })
  @ApiResponse({ status: 404, description: 'The category was not found' })
  @ApiResponse({ status: 409, description: 'A category with this name already exists' })
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete a category by id' })
  @ApiResponse({ status: 200, description: 'The category has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'The category was not found' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}
