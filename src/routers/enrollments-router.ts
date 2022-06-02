import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getEnrollmentByUser, postCreateOrUpdateEnrollment, postTypeOfEnrollment } from '@/controllers';
import { createEnrollmentSchema, typeSchema } from '@/schemas';

const enrollmentsRouter = Router();

enrollmentsRouter
  .all('/*', authenticateToken)
  .get('/enrollments', getEnrollmentByUser)
  .post('/enrollments', validateBody(createEnrollmentSchema), postCreateOrUpdateEnrollment)
  .post('/type', validateBody(typeSchema), postTypeOfEnrollment);

export { enrollmentsRouter };
