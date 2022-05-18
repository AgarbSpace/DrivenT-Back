import { ApplicationError } from '@/protocols';

export function cannotEnrollBeforeStartDateError(): ApplicationError {
  return {
    error: 'CannotEnrollBeforeStartDateError',
    message: 'Cannot enroll before event start date!',
  };
}
