import { Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../core';
import { Entity } from './types';
import { UrlDto } from './dto/url.dto';

export class UrlShortenerService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  findByKey(key: string) {
    return this.prisma.urlShortenerKey.findFirst({
      where: { key },
      include: {
        url: true,
      },
    });
  }

  list(): Promise<Entity[]> {
    return this.prisma.urlShortenerUrl.findMany({
      include: {
        keys: true,
      },
    });
  }

  async create(data: Prisma.UrlShortenerUrlCreateInput): Promise<Entity> {
    return this.prisma.urlShortenerUrl.create({
      data,
      include: { keys: true },
    });
  }

  // FIXME use transaction
  async delete(id: number): Promise<void> {
    await this.prisma.urlShortenerKey.deleteMany({ where: { urlId: id } });
    await this.prisma.urlShortenerUrl.delete({ where: { id } });
  }

  // FIXME use transaction
  async upsert(dto: UrlDto): Promise<Entity> {
    await this.prisma.urlShortenerKey.deleteMany({ where: { urlId: dto.id } });

    const fields = {
      title: dto.title,
      description: dto.description,
      url: dto.url,
      keys: {
        createMany: {
          data: dto.keys?.map((k) => ({ key: k })),
        },
      },
    };

    return this.prisma.urlShortenerUrl.upsert({
      create: {
        id: dto.id,
        ...fields,
      },
      update: {
        ...fields,
      },
      where: {
        id: dto.id,
      },
      include: {
        keys: true,
      },
    });
  }
}
