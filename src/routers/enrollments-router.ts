import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import {
  getEnrollmentByUser,
  getTypeofEnrollment,
  postCreateOrUpdateEnrollment,
  postTypeOfEnrollment,
} from '@/controllers';
import { createEnrollmentSchema, typeSchema } from '@/schemas';

const enrollmentsRouter = Router();

enrollmentsRouter
  .all('/*', authenticateToken)
  .get('/', getEnrollmentByUser)
  .post('/', validateBody(createEnrollmentSchema), postCreateOrUpdateEnrollment)
  .post('/type', validateBody(typeSchema), postTypeOfEnrollment)
  .get('/:enrollmentId', getTypeofEnrollment);

export { enrollmentsRouter };
