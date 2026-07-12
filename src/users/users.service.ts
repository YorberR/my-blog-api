import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  ];

  findAll() {
    return this.users;
  }

  getUserById(id: string) {
    const position = this.findOne(id);
    const user = this.users[position];
    return user;
  }

  create(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `$(new date().getTime())`,
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id: string) {
    const position = this.findOne(id);
    this.users.splice(position, 1);
    return {
      message: `User with id ${id} deleted`,
    };
  }

  update(id: string, changes: UpdateUserDto) {
    const position = this.findOne(id);
    const currentData = this.users[position];
    const updatedUser = {
      ...currentData,
      ...changes,
    };
    this.users[position] = updatedUser;
    return updatedUser;
  }

  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return position;
  }
}
