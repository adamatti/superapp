import axios from 'axios';
import { Context } from 'telegraf';

export const getDollar = async (): Promise<string> => {
  const url = 'http://economia.awesomeapi.com.br/json/last/USD-BRL';
  const response = await axios.get(url);
  return response.data.USDBRL.bid;
};

async function handle(ctx: Context) {
  const dollar = await getDollar();
  ctx.reply(dollar);
}

export default handle;
