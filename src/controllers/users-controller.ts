import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { createUser, isCurrentEventActive } from '@/services';
import { cannotEnrollBeforeStartDateError } from '@/errors';

export async function usersPost(req: Request, res: Response) {
  const { email, password } = req.body;

  const canEnroll = await isCurrentEventActive();
  if (!canEnroll) {
    return res.status(httpStatus.BAD_REQUEST).send(cannotEnrollBeforeStartDateError());
  }

  try {
    const user = await createUser({ email, password });
    res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (err) {
    if (err?.name === 'DuplicatedEmailError') {
      return res.status(httpStatus.CONFLICT).json(err);
    }

    throw err;
  }
}
