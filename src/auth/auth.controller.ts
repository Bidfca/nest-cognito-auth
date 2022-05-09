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
  async authenticateUser(@Body() user: { name: string; password: string }) {
    try {
      return await this.authService.authenticateUser(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm-registration')
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        code: { type: 'string' },
      },
    },
  })
  async confirmRegistration(
    @Body() { name, code }: { name: string; code: string },
  ) {
    try {
      return await this.authService.confirmRegistration(name, code);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('resend-confirmation-code')
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  })
  async resendConfirmationCode(@Body() { name }: { name: string }) {
    try {
      return await this.authService.resendConfirmationCode(name);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
