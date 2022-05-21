import supertest from 'supertest';
import httpStatus from 'http-status';
import faker from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';

import { cleanDb, generateValidToken } from '../helpers';
import { createUser, createEnrollmentWithAddress } from '../factories';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /enrollments', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/enrollments');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/enrollments').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/enrollments').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 204 when there is no enrollment for given user', async () => {
      const token = await generateValidToken();

      const response = await server.get('/enrollments').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NO_CONTENT);
    });

    it('should respond with status 200 and enrollment data with address when there is a enrollment for given user', async () => {
      const user = await createUser();
      const enrollment = await createEnrollmentWithAddress(user);
      const token = await generateValidToken(user);

      const response = await server.get('/enrollments').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: enrollment.id,
        name: enrollment.name,
        cpf: enrollment.cpf,
        birthday: enrollment.birthday.toISOString(),
        phone: enrollment.phone,
        address: {
          id: enrollment.Address[0].id,
          cep: enrollment.Address[0].cep,
          street: enrollment.Address[0].street,
          city: enrollment.Address[0].city,
          state: enrollment.Address[0].state,
          number: enrollment.Address[0].number,
          neighborhood: enrollment.Address[0].neighborhood,
          addressDetail: enrollment.Address[0].addressDetail,
        },
      });
    });
  });
});
