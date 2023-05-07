import { LoggerService } from '../../core';
import { BotEngineService } from './bot-engine.service';

describe('Bot Engine', () => {
  const logger: LoggerService = {} as LoggerService;
  let service: BotEngineService;

  beforeEach(() => {
    service = new BotEngineService(logger);
  });

  it('shall support dollar command', async () => {
    const value: string = await service.reply({ command: '/dollar' });
    expect(parseInt(value)).toBeGreaterThan(0);
  });

  it('shall support dollar text', async () => {
    const value: string = await service.reply({ message: 'dollar' });
    expect(parseInt(value)).toBeGreaterThan(0);
  });
});
