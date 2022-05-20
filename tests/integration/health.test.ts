import supertest from 'supertest';
import httpStatus from 'http-status';

import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

const server = supertest(app);

describe('GET /health', () => {
  it('should respond with status 200 with OK! text', async () => {
    const response = await server.get('/health');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe('OK!');
  });
});
