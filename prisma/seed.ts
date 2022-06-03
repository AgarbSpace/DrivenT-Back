import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
    console.log(event);
  }

  let type = await prisma.type.findFirst();
  if (!type) {
    let result = await prisma.type.createMany({
      data: [
        { name: 'online', hotel: false },
        { name: 'presencial', hotel: false },
        { name: 'presencial', hotel: true },
      ],
    });
    console.log(result);
  }

  let hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    let result = await prisma.hotel.createMany({
      data: [
        {
          name: 'Driven Resort',
          image: 'https://drive.google.com/file/d/1wgAW4BXgcegX2YKZzaT2C7rYdEdIsTMI/view?usp=sharing',
        },
        {
          name: 'Driven Palace',
          image: 'https://drive.google.com/file/d/1gG1ttPHinSECt07J0rR_ec1vQRqfv3Fq/view?usp=sharing',
        },
        {
          name: 'Driven World',
          image: 'https://drive.google.com/file/d/1OmkKOtOp4ZzZCWgMJFztYxg-ofGzXoua/view?usp=sharing',
        },
      ],
    });
    console.log(result);
  }

  let room = await prisma.room.findFirst();
  if (!room) {
    let result = await prisma.room.createMany({
      data: [
        { number: '101', hotelId: 1 },
        { number: '102', hotelId: 1 },
        { number: '103', hotelId: 1 },
        { number: '104', hotelId: 1 },
        { number: '105', hotelId: 1 },
        { number: '106', hotelId: 1 },
        { number: '107', hotelId: 1 },
        { number: '108', hotelId: 1 },
        { number: '109', hotelId: 1 },
        { number: '110', hotelId: 1 },
        { number: '111', hotelId: 1 },
        { number: '112', hotelId: 1 },

        { number: '101', hotelId: 2 },
        { number: '102', hotelId: 2 },
        { number: '103', hotelId: 2 },
        { number: '104', hotelId: 2 },
        { number: '105', hotelId: 2 },
        { number: '106', hotelId: 2 },
        { number: '107', hotelId: 2 },
        { number: '108', hotelId: 2 },
        { number: '109', hotelId: 2 },
        { number: '110', hotelId: 2 },
        { number: '111', hotelId: 2 },
        { number: '112', hotelId: 2 },

        { number: '101', hotelId: 3 },
        { number: '102', hotelId: 3 },
        { number: '103', hotelId: 3 },
        { number: '104', hotelId: 3 },
        { number: '105', hotelId: 3 },
        { number: '106', hotelId: 3 },
        { number: '107', hotelId: 3 },
        { number: '108', hotelId: 3 },
        { number: '109', hotelId: 3 },
        { number: '110', hotelId: 3 },
        { number: '111', hotelId: 3 },
        { number: '112', hotelId: 3 },
      ],
    });
    console.log(result);
  }

  let beds = await prisma.beds.findFirst();
  if (!beds) {
    let result = await prisma.beds.createMany({
      data: [
        { roomId: 1 },
        { roomId: 2 },
        { roomId: 3 },
        { roomId: 4 },
        { roomId: 5 },
        { roomId: 5 },
        { roomId: 6 },
        { roomId: 6 },
        { roomId: 7 },
        { roomId: 7 },
        { roomId: 8 },
        { roomId: 9 },
        { roomId: 10 },
        { roomId: 11 },
        { roomId: 12 },
        { roomId: 12 },
        { roomId: 13 },
        { roomId: 13 },
        { roomId: 14 },
        { roomId: 14 },
        { roomId: 15 },
        { roomId: 16 },
        { roomId: 17 },
        { roomId: 18 },
        { roomId: 19 },
        { roomId: 19 },
        { roomId: 20 },
        { roomId: 20 },
        { roomId: 21 },
        { roomId: 21 },
        { roomId: 22 },
        { roomId: 23 },
        { roomId: 24 },
        { roomId: 25 },
        { roomId: 26 },
        { roomId: 26 },
        { roomId: 27 },
        { roomId: 27 },
        { roomId: 28 },
        { roomId: 28 },
        { roomId: 29 },
        { roomId: 30 },
        { roomId: 31 },
        { roomId: 32 },
        { roomId: 33 },
        { roomId: 33 },
        { roomId: 34 },
        { roomId: 34 },
        { roomId: 35 },
        { roomId: 35 },
        { roomId: 36 },
      ],
    });
    console.log(result);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
