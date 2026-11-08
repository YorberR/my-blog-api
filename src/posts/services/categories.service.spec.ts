import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const categoriesRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, { provide: getRepositoryToken(Category), useValue: categoriesRepository }],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('creates a category', async () => {
    const category = { id: 1, name: 'Technology' };
    categoriesRepository.save.mockResolvedValue(category);

    await expect(service.create({ name: 'Technology' })).resolves.toBe(category);
    expect(categoriesRepository.save).toHaveBeenCalledWith({ name: 'Technology' });
  });

  it('returns all categories', async () => {
    const categories = [{ id: 1, name: 'Technology' }];
    categoriesRepository.find.mockResolvedValue(categories);

    await expect(service.findAll()).resolves.toBe(categories);
  });

  it('throws when a category does not exist', async () => {
    categoriesRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(42)).rejects.toThrow(NotFoundException);
  });
});
