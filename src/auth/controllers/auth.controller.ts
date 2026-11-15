import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import type { User } from '../../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../models/login-response.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log in with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully logged in', type: LoginResponse })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return {
      user,
      access_token: this.authService.generateToken(user),
    };
  }
}
