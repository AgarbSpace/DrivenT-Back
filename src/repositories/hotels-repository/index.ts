import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany({
    include: {
      Room: {
        include: {
          Beds: true,
        },
      },
    },
  });
}

async function insertBedOnEnrollment(bedId: number, enrollmentId: number) {
  return await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { bedId: bedId },
  });
}

async function findBed(bedId: number) {
  const response = await prisma.beds.findFirst({
    where: { id: bedId },
  });
  return response;
}

async function changeValueOfBedOccupation(occupied: boolean, bedId: number) {
  await prisma.beds.update({
    where: { id: bedId },
    data: { occupied: !occupied },
  });
}

const hotelRepository = {
  findHotels,
  insertBedOnEnrollment,
  changeValueOfBedOccupation,
  findBed,
};

export default hotelRepository;
