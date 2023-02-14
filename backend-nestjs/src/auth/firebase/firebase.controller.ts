import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CookieOptions, Response } from 'express';
import { IsPublic } from '../is-public.decorator';
import { SigninRequest } from './dto';
import { FirebaseService } from './firebase.service';
import { TokenResponse } from './dto';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { ConfigService } from '@nestjs/config';
import { WebConfig } from '~/config';

@ApiTags('Auth')
@Controller('/auth')
export class FirebaseController {
  private readonly domain: string;
  private readonly cookieSecure: boolean;

  constructor(configService: ConfigService, private readonly firebaseService: FirebaseService) {
    this.cookieSecure = configService.get<string>('appEnv') !== 'dev';
    this.domain = configService.get<WebConfig>('web').domain;
  }

  @Post('/signup')
  @IsPublic()
  @ApiOperation({ description: 'Perform signup' })
  @ApiResponse({ status: 201, description: 'User created', type: TokenResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signup(@Body() dto: SigninRequest, @Res({ passthrough: true }) res: Response) {
    try {
      const tokens = await this.firebaseService.createUser(dto.email, dto.password);
      this.setCookies(res, tokens);
      res.status(HttpStatus.CREATED).json(tokens).end();
    } catch (error) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          error: error.message,
        })
        .end();
    }
    return null;
  }

  @Post('/signin')
  @IsPublic()
  @ApiOperation({ description: 'Perform signin' })
  @ApiResponse({ status: 200, description: 'User authenticated', type: TokenResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signin(@Body() dto: SigninRequest, @Res({ passthrough: true }) res: Response) {
    try {
      const tokens = await this.firebaseService.login(dto.email, dto.password);
      this.setCookies(res, tokens);
      res.status(200).json(tokens).end();
    } catch (error) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          error: error.message,
        })
        .end();
    }
    return null;
  }

  // FIXME implement
  @Get('/self')
  @ApiOperation({ description: 'Get info about authenticated user' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  self() {
    return {
      todo: 'implement',
    };
  }

  @Get('/logout')
  logout(@Res({ passthrough: true }) res: Response): void {
    const settings: CookieOptions = {
      maxAge: 0,
      httpOnly: true,
      secure: this.cookieSecure,
      sameSite: 'none',
      domain: this.domain,
    };

    const cookieNames = [ACCESS_TOKEN, REFRESH_TOKEN];

    cookieNames.forEach((cookieName) => {
      res.cookie(cookieName, settings);
    });
    res.status(HttpStatus.ACCEPTED).end();
  }

  private setCookies(response: Response, tokens: TokenResponse) {
    const days = 30;
    const settings: CookieOptions = {
      httpOnly: true,
      secure: this.cookieSecure,
      sameSite: 'none',
      maxAge: days * 24 * 60 * 60 * 1000,
      domain: this.domain,
    };

    response.cookie(ACCESS_TOKEN, tokens.accessToken, settings);
    response.cookie(REFRESH_TOKEN, tokens.refreshToken, settings);
  }
}
