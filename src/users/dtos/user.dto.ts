import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, MinLength, ValidateNested, IsOptional } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ description: 'The password of the user (min 8 characters)', minLength: 8, format: 'password', example: 'Password123!' })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of the user', example: 'john@example.com' })
  email: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  @ApiProperty({ type: CreateProfileDto, description: 'The profile of the user' })
  profile: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile: UpdateProfileDto;
}
