import { EnvelopedEvent } from '@slack/bolt';

export interface SlackUrlVerification {
  token: string;
  challenge: string;
  type: 'url_verification';
}

export type SlackMessage = EnvelopedEvent<{
  channel: string;
  subtype: string;
  bot_id?: string;
  text: string;
}>;
