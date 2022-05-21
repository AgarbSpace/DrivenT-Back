import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { signIn } from '@/services';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const result = await signIn({ email, password });
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err?.name === 'InvalidCredentialsError') {
      return res.status(httpStatus.UNAUTHORIZED).json(err);
    }

    throw err;
  }
}
