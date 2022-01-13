import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, SignupRequest } from './models';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() signupRequest: SignupRequest): Promise<LoginResponse> {
    return await this.authService.signupAndLogin(signupRequest);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginRequest: LoginRequest,
    @Res() res: any,
  ): Promise<LoginResponse> {
    const loginResponse = await this.authService.login(loginRequest);
    res.cookie('refresh_token', loginResponse.refreshToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });
    return res.send(loginResponse);
  }

  @UseGuards(AuthGuard('jwt-refreshtoken'))
  @Post('refresh-token')
  async refreshToken(@Req() req: any, @Res() res: any): Promise<LoginResponse> {
    const loginResponse = await this.authService.getLoginResponse(req.user);
    return res.send(loginResponse);
  }
}
