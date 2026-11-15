import { IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ description: 'The title of the post' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The content of the post' })
  content: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ description: 'The cover image of the post' })
  coverImage: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ description: 'The summary of the post' })
  summary: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds?: number[];
}
