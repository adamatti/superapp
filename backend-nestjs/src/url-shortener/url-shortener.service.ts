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

  /**
   * Find and update statistics
   * @param applicationKey
   * @param key
   * @returns
   */
  async findUrlPathByKey(applicationKey: string, key: string): Promise<null | string> {
    const urlEntity = await this.prisma.urlShortenerUrl.findFirst({
      select: { id: true, url: true },
      where: {
        keys: {
          some: { key },
        },
        user: {
          applications: {
            some: {
              key: applicationKey,
            },
          },
        },
      },
    });

    if (urlEntity) {
      await this.updateLastUsage(urlEntity.id);
    }

    return urlEntity.url;
  }

  list(userId: number): Promise<Entity[]> {
    return this.prisma.urlShortenerUrl.findMany({
      include: {
        keys: true,
      },
      where: {
        userId,
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
  async delete(userId: number, id: number): Promise<void> {
    await this.prisma.urlShortenerKey.deleteMany({ where: { urlId: id, userId } });
    await this.prisma.urlShortenerUrl.delete({ where: { id, userId } });
  }

  // FIXME use transaction
  async upsert(dto: UrlDto): Promise<Entity> {
    await this.prisma.urlShortenerKey.deleteMany({ where: { urlId: dto.id, userId: dto.userId } });

    const fields = {
      title: dto.title,
      description: dto.description,
      url: dto.url,
      keys: {
        createMany: {
          data: dto.keys?.map((k) => ({ userId: dto.userId, key: k })),
        },
      },
    };

    const dbPromise = this.prisma.urlShortenerUrl.upsert({
      create: {
        id: dto.id,
        userId: dto.userId,
        ...fields,
      },
      update: {
        ...fields,
      },
      where: {
        id: dto.id,
        userId: dto.userId,
      },
      include: {
        keys: true,
      },
    });

    return dbPromise;
  }

  private async updateLastUsage(urlId: number): Promise<void> {
    await this.prisma.urlShortenerUrl.update({
      data: {
        lastUsage: new Date(),
        usageCount: { increment: 1 },
      },
      where: { id: urlId },
    });
  }
}
