import { ApiProperty } from '@nestjs/swagger';
import { TodoItem as PrismaTodoItem } from '@prisma/client';

export class TodoItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  static fromPrisma(entity: PrismaTodoItem): TodoItem {
    const dto = new TodoItem();
    return Object.assign(dto, entity);
  }
}
