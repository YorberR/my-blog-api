import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Post } from './post.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @ApiProperty({ description: 'The id of the category' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the category', example: 'Technology' })
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @ApiProperty({ description: 'The description of the category', nullable: true })
  @Column({ type: 'varchar', length: 800, nullable: true })
  description: string;

  @ApiProperty({ description: 'The date the category was created' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the category was last updated' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ type: () => Post, isArray: true, description: 'The posts of the category' })
  @ManyToMany(() => Post, (post) => post.categories)
  posts: Post[];
}
