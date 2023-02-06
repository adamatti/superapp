import { Inject } from '@nestjs/common';
import { PrismaService } from '../core';

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
}
