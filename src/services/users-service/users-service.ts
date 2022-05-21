import bcrypt from 'bcrypt';

import { duplicatedEmailError } from './errors';
import { prisma } from '@/config';
import { User } from '@/entities';

export async function createUser(params: CreateParams): Promise<User> {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });

  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }

  const hashedPassword = await bcrypt.hash(params.password, 12);
  return prisma.user.create({
    data: {
      email: params.email,
      password: hashedPassword,
    },
  });
}

type CreateParams = {
  email: string;
  password: string;
};
