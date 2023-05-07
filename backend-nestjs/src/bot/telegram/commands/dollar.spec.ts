import { getDollar } from './dollar';

describe('Dollar command', () => {
  it('shall return dollar', async () => {
    const dollar = await getDollar();
    expect(Number(dollar)).not.toBeNaN();
    expect(Number(dollar)).toBeGreaterThan(0);
  });
});
