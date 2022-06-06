import Joi from 'joi';
import { Type } from '@prisma/client';

export type TypeofEnrollmentBody = Omit<Type, 'id'>;

export const typeSchema = Joi.object<TypeofEnrollmentBody>({
  name: Joi.string().valid('Online', 'Presencial').required(),
  hotel: Joi.boolean(),
});
