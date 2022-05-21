import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { invalidCredentialsError } from './errors';
import { prisma } from '@/config';

export async function signIn(params: AuthenticationParams): Promise<AuthenticationResult> {
  const { email, password } = params;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw invalidCredentialsError();

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  await prisma.session.create({
    data: {
      token,
      userId: user.id,
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    token,
  };
}

type AuthenticationParams = {
  email: string;
  password: string;
};

type AuthenticationResult = {
  user: {
    id: number;
    email: string;
  };
  token: string;
};
