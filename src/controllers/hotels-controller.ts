import hotelsService from '@/services/hotels-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getHotelInfo(req: Request, res: Response) {
  const hotels = await hotelsService.getHotels();

  return res.status(httpStatus.OK).send(hotels);
}
