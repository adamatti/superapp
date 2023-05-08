// FIXME fix typescript issues
// import { ChatGPTAPI, ChatMessage } from 'chatgpt';
import { Injectable } from '@nestjs/common';

interface ChatMessage {
  text: string;
}

@Injectable({})
export class ChatGptService {
  /*
  private readonly api: ChatGPTAPI;

  constructor() {
    const apiKey: string = process.env.OPENAI_TOKEN ?? '';
    if (!apiKey) {
      throw new Error('Empty ChatGPT key');
    }
    this.api = new ChatGPTAPI({ apiKey });
  }
 */
  async sendMessage(text: string): Promise<ChatMessage> {
    console.log('Calling chat gpt');
    /*
    const gptResponse: ChatMessage = await this.api.sendMessage(text, {});
    return gptResponse;
    */
    return null;
  }
}
