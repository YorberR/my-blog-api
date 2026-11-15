import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/user.entity';

export class LoginResponse {
  @ApiProperty({ type: User, description: 'The logged in user' })
  user: User;

  @ApiProperty({ description: 'The JWT access token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;
}
