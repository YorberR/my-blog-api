import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'profiles'})
export class Profile {
  @ApiProperty({ description: 'The id of the profile' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The first name of the profile', example: 'John' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'The last name of the profile', example: 'Doe' })
  @Column({ type: 'varchar', length: 255, unique: true, name: 'last_name' })
  lastName: string;

  @ApiProperty({ description: 'The avatar URL of the profile', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @ApiProperty({ description: 'The date the profile was created' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the profile was last updated' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;
}
