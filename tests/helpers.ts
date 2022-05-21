import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.event.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}
