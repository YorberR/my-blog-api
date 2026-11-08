import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find({
      relations: {
        profile: true,
      },
    });
    return users;
  }

  async getUserById(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new ForbiddenException(`User with id ${id} not found`);
    }
    return user;
  }

  async getProfileByUserId(id: number) {
    const user = await this.findOne(id);
    if (!user.profile) {
      throw new NotFoundException(`Profile for user with id ${id} not found`);
    }
    return user.profile;
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save(body);
      return newUser;
    } catch {
      throw new BadRequestException(`Error creating user`);
    }
  }

  async delete(id: number) {
    try {
      await this.usersRepository.delete(id);
      return {
        message: `User with id ${id} deleted`,
      };
    } catch {
      throw new BadRequestException(`Error deleting user with id ${id}`);
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const updatedUser = this.usersRepository.merge(user, changes);
      const saveUser = await this.usersRepository.save(updatedUser);
      return saveUser;
    } catch {
      throw new BadRequestException(`Error updating user with id ${id}`);
    }
  }

  private async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
