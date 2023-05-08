import { Module } from '@nestjs/common';
import { ChatGptService } from './gpt.service';

@Module({
  providers: [ChatGptService],
})
export class ChatGptModule {}
