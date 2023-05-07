import axios from 'axios';
import { BotRequest, BotCommand } from '../types';

export class DollarCommand implements BotCommand {
  private readonly dollarKeyWords = ['dollar', 'dollar-dev', 'dolar'];

  readonly commands: string[] = ['dollar', 'dolar'];

  accept(request: BotRequest): boolean {
    return !!this.dollarKeyWords.find((k) => {
      return `/${k}` === request.command || k === request.command || k === request.message;
    });
  }

  async reply(): Promise<string> {
    const url = 'http://economia.awesomeapi.com.br/json/last/USD-BRL';
    const response = await axios.get(url);
    return response.data.USDBRL.bid;
  }
}
