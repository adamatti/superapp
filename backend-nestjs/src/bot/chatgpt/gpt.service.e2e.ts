import { ChatGptService } from './gpt.service';

describe.skip('Gpt Service', () => {
  let service: ChatGptService;

  beforeEach(() => {
    service = new ChatGptService();
  });

  it('happy path', async () => {
    const response = await service.sendMessage('hello world');
    console.log('Received gpt response: ', response);
    expect(response.text).toBeTruthy();
  });
});
