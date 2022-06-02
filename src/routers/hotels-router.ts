import { Router } from 'express';
import { getHotelInfo } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.get('/', getHotelInfo);

export { hotelsRouter };
