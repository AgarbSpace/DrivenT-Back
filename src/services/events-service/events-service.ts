import dayjs from 'dayjs';
import { Event } from '@prisma/client';
import { prisma } from '@/config';

export async function getFirstEvent(): Promise<GetFirstEventResult> {
  const event = await prisma.event.findFirst();
  if (!event) return;

  return {
    id: event.id,
    title: event.title,
    backgroundImageUrl: event.backgroundImageUrl,
    logoImageUrl: event.logoImageUrl,
    startsAt: event.startsAt,
    endsAt: event.endsAt,
  };
}

export type GetFirstEventResult = Omit<Event, 'createdAt' | 'updatedAt'>;

export async function isCurrentEventActive(): Promise<boolean> {
  const event = await getFirstEvent();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}
