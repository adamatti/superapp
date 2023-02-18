import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Entity } from '../types';

export class UrlDto {
  @ApiProperty()
  id?: number;

  userId: number;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  keys: string[];

  static fromEntity(entity: Entity): UrlDto {
    const dto = new UrlDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.url = entity.url;
    dto.keys = entity.keys.map((k) => k.key);
    return dto;
  }

  toCreate(): Prisma.UrlShortenerUrlCreateInput {
    return {
      user: {
        connect: {
          id: this.userId,
        },
      },
      title: this.title,
      description: this.description,
      url: this.url,
      keys: {
        create: this.keys.map((k) => ({
          user: {
            connect: {
              id: this.userId,
            },
          },
          key: k,
        })),
      },
    };
  }
}
