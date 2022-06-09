import { Router } from 'express';
import { getHotelInfo, postBedBooking } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { bedSchema } from '@/schemas';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotelInfo).post('/', validateBody(bedSchema), postBedBooking);

export { hotelsRouter };
