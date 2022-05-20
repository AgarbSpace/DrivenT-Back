import { Router } from 'express';

import { createUserSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { usersPost } from '@/controllers/users-controller';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), usersPost);

export { usersRouter };
