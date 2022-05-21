import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}
