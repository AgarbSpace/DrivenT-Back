import { Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';
import { getOneWithAddressByUserId } from '@/services';

export async function getByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const enrollmentWithAddress = await getOneWithAddressByUserId(userId);
  if (!enrollmentWithAddress) return res.sendStatus(httpStatus.NO_CONTENT);

  return res.status(httpStatus.OK).send(enrollmentWithAddress);
}
