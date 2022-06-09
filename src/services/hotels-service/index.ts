import { Hotel, Room } from '@prisma/client';
import { notFoundError, conflictError } from '@/errors';
import hotelRepository from '@/repositories/hotels-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { AuthenticatedRequest } from '@/middlewares';

export type GetHotels = Omit<Hotel, 'id'>;
export type GetRooms = Omit<Room, 'id'>;

export type GetHotelsAndRooms = GetHotels & { Room: [GetRooms] };

async function getHotels() {
  const hotels = await hotelRepository.findHotels();
  if (!hotels) throw notFoundError();

  return hotels;
}

async function insertBedValue(bedId: number, enrollmentId: number, userId: number) {
  const enrollmentOutdated = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (enrollmentOutdated.bedId !== null) {
    if (enrollmentOutdated.bedId === bedId) throw conflictError('The bed selected can not be the same then anterior');

    const bed = await hotelRepository.findBed(enrollmentOutdated.bedId);
    await hotelRepository.changeValueOfBedOccupation(bed.occupied, bed.id);
  }

  await hotelRepository.insertBedOnEnrollment(bedId, enrollmentId);

  const enrollmentUpdated = await enrollmentRepository.findEnrollmentByUserId(userId);
  const bed = await hotelRepository.findBed(enrollmentUpdated.bedId);
  await hotelRepository.changeValueOfBedOccupation(bed.occupied, bed.id);
}

const hotelsService = {
  getHotels,
  insertBedValue,
};

export default hotelsService;
