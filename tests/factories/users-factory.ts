import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { User } from '@/entities/user';

export function createUser(params: Partial<User> = {}): Promise<User> {
  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      password: params.password || faker.internet.password(6),
    },
  });
}
