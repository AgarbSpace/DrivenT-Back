import dayjs from 'dayjs';
import faker from '@faker-js/faker';
import { Event } from '@prisma/client';
import { prisma } from '@/config';

export function createEvent(): Promise<Event> {
  return prisma.event.create({
    data: {
      title: faker.lorem.sentence(),
      backgroundImageUrl: faker.image.imageUrl(),
      logoImageUrl: faker.image.imageUrl(),
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(5, 'days').toDate(),
    },
  });
}
