import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getByUser } from '@/controllers';

const enrollmentsRouter = Router();

enrollmentsRouter.get('/', authenticateToken, getByUser);

export { enrollmentsRouter };
