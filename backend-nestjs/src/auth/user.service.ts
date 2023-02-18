import { Inject } from '@nestjs/common';
import { AuthUser } from '@prisma/client';
import { PrismaService } from '../core';

// TODO consider move complex queries to repository
export class UserService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findOrCreateUserByIdendity(user: Partial<AuthUser>, identity: string) {
    const entity = await this.prisma.authUser.findFirst({
      where: {
        identities: {
          some: {
            identity,
          },
        },
      },
    });

    if (entity) {
      return entity;
    }

    return this.prisma.authIdentity.create({
      data: {
        identity,
        user: {
          connectOrCreate: {
            create: {
              email: user.email,
            },
            where: {
              email: user.email,
            },
          },
        },
      },
    });
  }

  findUserByAplication(key: string) {
    return this.prisma.authUser.findFirst({
      where: {
        applications: {
          some: {
            key,
          },
        },
      },
    });
  }
}
