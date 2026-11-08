import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(body: CreatePostDto) {
    try {
      const newPost = await this.postsRepository.save({
        ...body,
        user: { id: body.UserId },
        categories: body.categoryIds?.map((id) => ({ id })),
      });
      return this.findOne(newPost.id);
    } catch {
      throw new BadRequestException('Error creating post');
    }
  }

  async findAll() {
    return this.postsRepository.find({
      relations: { user: { profile: true }, categories: true },
    });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: { user: { profile: true }, categories: true },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);

    try {
      const updatedPost = this.postsRepository.merge(post, updatePostDto);
      const savePost = await this.postsRepository.save(updatedPost);
      return savePost;
    } catch {
      throw new BadRequestException(`Error updating post with id ${id}`);
    }
  }

  async delete(id: number) {
    try {
      await this.postsRepository.delete(id);
      return { message: `Post with id ${id} deleted` };
    } catch {
      throw new BadRequestException(`Error deleting post with id ${id}`);
    }
  }

  async getPostsByCategoryId(categoryId: number) {
    const posts = await this.postsRepository.find({
      where: { categories: { id: categoryId } },
      relations: { user: { profile: true } },
    });
    return posts;
  }
}
