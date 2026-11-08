import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesRepository.save(createCategoryDto);
    } catch (error) {
      this.throwIfDuplicateName(error);
      throw error;
    }
  }

  async findAll() {
    return this.categoriesRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    const updatedCategory = this.categoriesRepository.merge(category, updateCategoryDto);

    try {
      return await this.categoriesRepository.save(updatedCategory);
    } catch (error) {
      this.throwIfDuplicateName(error);
      throw error;
    }
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.categoriesRepository.delete(id);
    return { message: `Category with id ${id} deleted` };
  }

  private throwIfDuplicateName(error: unknown): void {
    if (error instanceof QueryFailedError && (error.driverError as { code?: string }).code === '23505') {
      throw new ConflictException('A category with this name already exists');
    }
  }
}
