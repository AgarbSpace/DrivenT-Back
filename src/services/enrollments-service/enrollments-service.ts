import { prisma } from '@/config';

export async function getOneWithAddressByUserId(userId: number) {
  const enrollmentWithAddress = await prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });

  if (!enrollmentWithAddress) return undefined;

  const firstAddress = enrollmentWithAddress.Address[0];
  const address = firstAddress
    ? {
        id: firstAddress.id,
        cep: firstAddress.cep,
        street: firstAddress.street,
        city: firstAddress.city,
        state: firstAddress.state,
        number: firstAddress.number,
        neighborhood: firstAddress.neighborhood,
        addressDetail: firstAddress.addressDetail,
      }
    : null;

  return {
    id: enrollmentWithAddress.id,
    name: enrollmentWithAddress.name,
    cpf: enrollmentWithAddress.cpf,
    birthday: enrollmentWithAddress.birthday,
    phone: enrollmentWithAddress.phone,
    ...(!!address && { address }),
  };
}

export async function createOrUpdateEnrollmentWithAddress(params: CreateEnrollmentParams) {
  const createOrUpdateParams = {
    name: params.name,
    cpf: params.cpf,
    birthday: params.birthday,
    phone: params.phone,
    userId: params.userId,
    Address: {
      create: {
        cep: params.address.cep,
        street: params.address.street,
        city: params.address.city,
        number: params.address.number,
        state: params.address.state,
        neighborhood: params.address.neighborhood,
        ...(params.address.addressDetail && { addressDetail: params.address.addressDetail }),
      },
    },
  };

  await prisma.enrollment.upsert({
    where: {
      userId: params.userId,
    },
    create: createOrUpdateParams,
    update: createOrUpdateParams,
    include: {
      Address: true,
    },
  });
}

export type CreateEnrollmentParams = {
  name: string;
  cpf: string;
  birthday: string;
  phone: string;
  userId: number;
  address: {
    cep: string;
    street: string;
    city: string;
    number: string;
    state: string;
    neighborhood: string;
    addressDetail?: string;
  };
};
