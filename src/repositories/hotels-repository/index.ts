import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany({
    include: {
      Room: true,
    },
  });
}

const hotelRepository = {
  findHotels,
};

export default hotelRepository;
