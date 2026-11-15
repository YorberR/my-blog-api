import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The first name of the profile', example: 'John' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the profile', example: 'Doe' })
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The avatar URL of the profile', required: false, example: 'https://example.com/avatar.png' })
  avatar: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
