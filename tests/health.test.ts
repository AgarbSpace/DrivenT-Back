import supertest from 'supertest';

import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

describe('GET /health', () => {
  it('should return 200 with OK! text', async () => {
    const response = await supertest(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.text).toBe('OK!');
  });
});
