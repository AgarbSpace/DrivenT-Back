import { Hotel, Room } from '@prisma/client';
import { notFoundError } from '@/errors';
import hotelRepository from '@/repositories/hotels-repository';

export type GetHotels = Omit<Hotel, 'id'>;
export type GetRooms = Omit<Room, 'id'>;

export type GetHotelsAndRooms = GetHotels & { Room: [GetRooms] };

async function getHotels() {
  const hotels = await hotelRepository.findHotels();
  if (!hotels) throw notFoundError();

  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
