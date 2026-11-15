import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { Profile } from './profile.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity({name: 'users'})
export class User {
  @ApiProperty({ description: 'The id of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'The email of the user', example: 'john@example.com' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ApiProperty({ description: 'The date the user was created' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the user was last updated' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({ type: Profile, description: 'The profile of the user' })
  @OneToOne(() => Profile, { nullable: true, cascade: true })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ApiProperty({ type: () => Post, isArray: true, description: 'The posts of the user' })
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
