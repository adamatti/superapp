import { Context } from 'telegraf';
import { TelegramUpdate } from '../types';

const handle = (ctx: Context) => {
  const update = ctx.update as TelegramUpdate;
  ctx.reply(`Msg received: ${update.message.text}`);
};

export default handle;
