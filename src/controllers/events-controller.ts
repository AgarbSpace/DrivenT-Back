import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { notFoundError } from '@/errors';
import { getFirst } from '@/services';

export async function getDefault(_req: Request, res: Response) {
  const event = await getFirst();
  if (!event) {
    return res.status(httpStatus.NOT_FOUND).send(notFoundError());
  }

  return res.status(httpStatus.OK).send(event);
}
