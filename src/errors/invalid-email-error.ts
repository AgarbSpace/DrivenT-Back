import { ApplicationError } from '@/protocols';

export function invalidEmailError(email: string): ApplicationEmailError {
  return {
    error: 'InvalidEmailError',
    email: email,
    message: `"${email}" is not a valid email!`,
  };
}

export type ApplicationEmailError = ApplicationError & { email: string };
