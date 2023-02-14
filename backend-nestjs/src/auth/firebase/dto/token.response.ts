import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  constructor(args: Partial<TokenResponse> = {}) {
    Object.assign(this, args);
  }
}
