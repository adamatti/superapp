export interface BotRequest {
  command?: string;
  message?: string;
}

export interface BotCommand {
  commands: string[];
  accept: (request: BotRequest) => boolean;
  reply: (request: BotRequest) => Promise<string>;
}
