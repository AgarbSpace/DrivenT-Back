import { Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';
import { createOrUpdateEnrollmentWithAddress, getOneWithAddressByUserId } from '@/services';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const enrollmentWithAddress = await getOneWithAddressByUserId(userId);
  if (!enrollmentWithAddress) return res.sendStatus(httpStatus.NO_CONTENT);

  return res.status(httpStatus.OK).send(enrollmentWithAddress);
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  await createOrUpdateEnrollmentWithAddress({
    name: req.body.name,
    cpf: req.body.cpf,
    birthday: req.body.birthday,
    phone: req.body.phone,
    userId: req.userId,
    address: {
      cep: req.body.address.cep,
      street: req.body.address.street,
      city: req.body.address.city,
      number: req.body.address.number,
      state: req.body.address.state,
      neighborhood: req.body.address.neighborhood,
      ...(req.body.address.addressDetail && { addressDetail: req.body.address.addressDetail }),
    },
  });

  return res.sendStatus(httpStatus.OK);
}
