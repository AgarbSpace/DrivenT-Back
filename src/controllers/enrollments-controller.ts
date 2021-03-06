import { AuthenticatedRequest } from '@/middlewares';
import enrollmentsService from '@/services/enrollments-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

  return res.status(httpStatus.OK).send(enrollmentWithAddress);
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  await enrollmentsService.createOrUpdateEnrollmentWithAddress({
    ...req.body,
    userId: req.userId,
  });

  return res.sendStatus(httpStatus.OK);
}

export async function postTypeOfEnrollment(req: AuthenticatedRequest, res: Response) {
  await enrollmentsService.createTypeforEnrollment({
    ...req.body,
    userId: req.userId,
  });

  return res.sendStatus(201);
}

export async function getTypeofEnrollment(req: AuthenticatedRequest, res: Response) {
  const { enrollmentId } = req.params;

  const enrollment = await enrollmentsService.getTypeofEnrollment(+enrollmentId);

  return res.send(enrollment);
}
