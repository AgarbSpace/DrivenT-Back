import { Router } from 'express';
import { getDefault } from '@/controllers';

const eventsRouter = Router();

eventsRouter.get('/', getDefault);

export { eventsRouter };
