import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { notFoundError } from '@/errors';
import { getFirstEvent } from '@/services';

export async function getDefaultEvent(_req: Request, res: Response) {
  const event = await getFirstEvent();
  if (!event) {
    return res.status(httpStatus.NOT_FOUND).send(notFoundError());
  }

  return res.status(httpStatus.OK).send(event);
}
