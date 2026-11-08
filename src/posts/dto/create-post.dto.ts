import { IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  coverImage: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  summary: string;

  @IsNotEmpty()
  @IsNumber()
  UserId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds?: number[];
}
