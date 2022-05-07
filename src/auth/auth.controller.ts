import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  async register(
    @Body()
    user: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    try {
      return await this.authService.register(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  async login(@Body() authenticateRequest: { name: string; password: string }) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
