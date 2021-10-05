import { Controller, Post, Body, Param, Get, Res } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../user.entity';
import {Response, Request} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() user: User, @Res({ passthrough: true }) response: Response): Promise<any> {
    return this.authService.login(user, response);
  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }

}
