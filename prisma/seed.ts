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
        { number: '101', beds: 2, hotelId: 1, enrollmentId: null },
        { number: '102', beds: 2, hotelId: 1, enrollmentId: null },
        { number: '103', beds: 1, hotelId: 1, enrollmentId: null },
        { number: '104', beds: 2, hotelId: 1, enrollmentId: null },
        { number: '105', beds: 2, hotelId: 1, enrollmentId: null },
        { number: '106', beds: 1, hotelId: 1, enrollmentId: null },
        { number: '107', beds: 2, hotelId: 1, enrollmentId: null },
        { number: '108', beds: 2, hotelId: 1, enrollmentId: null },
        { number: '109', beds: 1, hotelId: 1, enrollmentId: null },
        { number: '110', beds: 2, hotelId: 1, enrollmentId: null },

        { number: '101', beds: 2, hotelId: 2, enrollmentId: null },
        { number: '102', beds: 2, hotelId: 2, enrollmentId: null },
        { number: '103', beds: 1, hotelId: 2, enrollmentId: null },
        { number: '104', beds: 2, hotelId: 2, enrollmentId: null },
        { number: '105', beds: 2, hotelId: 2, enrollmentId: null },
        { number: '106', beds: 1, hotelId: 2, enrollmentId: null },
        { number: '107', beds: 2, hotelId: 2, enrollmentId: null },
        { number: '108', beds: 2, hotelId: 2, enrollmentId: null },
        { number: '109', beds: 1, hotelId: 2, enrollmentId: null },
        { number: '110', beds: 2, hotelId: 2, enrollmentId: null },

        { number: '101', beds: 2, hotelId: 3, enrollmentId: null },
        { number: '102', beds: 2, hotelId: 3, enrollmentId: null },
        { number: '103', beds: 1, hotelId: 3, enrollmentId: null },
        { number: '104', beds: 2, hotelId: 3, enrollmentId: null },
        { number: '105', beds: 2, hotelId: 3, enrollmentId: null },
        { number: '106', beds: 1, hotelId: 3, enrollmentId: null },
        { number: '107', beds: 2, hotelId: 3, enrollmentId: null },
        { number: '108', beds: 2, hotelId: 3, enrollmentId: null },
        { number: '109', beds: 1, hotelId: 3, enrollmentId: null },
        { number: '110', beds: 2, hotelId: 3, enrollmentId: null },
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
