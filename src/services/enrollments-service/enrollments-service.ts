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
