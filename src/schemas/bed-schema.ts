import Joi from 'joi';

export const bedSchema = Joi.object({
  bedId: Joi.number(),
});
