import { Event } from '@prisma/client';
import { prisma } from '@/config';

export async function getFirst(): Promise<GetFirstEventResult> {
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
