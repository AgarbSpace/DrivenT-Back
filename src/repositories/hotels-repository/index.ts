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

const hotelRepository = {
  findHotels,
};

export default hotelRepository;
