import hotelsService from '@/services/hotels-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getHotelInfo(req: Request, res: Response) {
  const hotels = await hotelsService.getHotels();

  return res.status(httpStatus.OK).send(hotels);
}

export async function postBedBooking(req: Request, res: Response) {
  const bedId = req.body.bedId as number;
  const enrollmentId = res.locals.enrollmentId as number;
  const userId = res.locals.userId as number;

  await hotelsService.insertBedValue(bedId, enrollmentId, userId);

  return res.sendStatus(201);
}
