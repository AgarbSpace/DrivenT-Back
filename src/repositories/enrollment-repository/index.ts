import { prisma } from '@/config';
import { Enrollment, Type } from '@prisma/client';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

async function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
  });
}

async function findTypeofEnrollment(params: TypeOfEnrollmentAndUser) {
  return prisma.type.findFirst({
    where: { name: params.name, hotel: params.hotel },
  });
}

async function createTypeofEnrollment(enrollmentId: number, typeId: number) {
  return prisma.enrollmentType.create({
    data: { enrollmentId: enrollmentId, typeId: typeId },
  });
}

export type TypeOfEnrollmentAndUser = Omit<Type, 'id'> & { userId: number };
export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findEnrollmentByUserId,
  findTypeofEnrollment,
  createTypeofEnrollment,
};

export default enrollmentRepository;
