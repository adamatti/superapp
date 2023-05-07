import { Telegraf } from 'telegraf';
import dolarHandle from './dollar';
import replyHandle from './reply';

export const registerBotCommands = (bot: Telegraf) => {
  bot.command('dolar', dolarHandle);
  bot.command('dollar', dolarHandle);

  // Default callback
  bot.on('message', replyHandle);
};
