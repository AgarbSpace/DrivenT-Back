import { notFoundError } from '@/errors';
import addressRepository, { CreateAddressParams } from '@/repositories/address-repository';
import enrollmentRepository, {
  CreateEnrollmentParams,
  TypeOfEnrollmentAndUser,
} from '@/repositories/enrollment-repository';
import { exclude } from '@/utils/prisma-utils';
import { Address, Enrollment } from '@prisma/client';

async function getOneWithAddressByUserId(userId: number): Promise<GetOneWithAddressByUserIdResult> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();

  const [firstAddress] = enrollmentWithAddress.Address;
  const address = getFirstAddress(firstAddress);

  return {
    ...exclude(enrollmentWithAddress, 'userId', 'createdAt', 'updatedAt', 'Address'),
    ...(!!address && { address }),
  };
}

type GetOneWithAddressByUserIdResult = Omit<Enrollment, 'userId' | 'createdAt' | 'updatedAt'>;

function getFirstAddress(firstAddress: Address): GetAddressResult {
  if (!firstAddress) return null;

  return exclude(firstAddress, 'createdAt', 'updatedAt', 'enrollmentId');
}

type GetAddressResult = Omit<Address, 'createdAt' | 'updatedAt' | 'enrollmentId'>;

async function createOrUpdateEnrollmentWithAddress(params: CreateOrUpdateEnrollmentWithAddress) {
  const enrollment = exclude(params, 'address');
  const address = getAddressForUpsert(params.address);

  const newEnrollment = await enrollmentRepository.upsert(params.userId, enrollment, exclude(enrollment, 'userId'));

  await addressRepository.upsert(newEnrollment.id, address, address);
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

async function createTypeforEnrollment(params: TypeOfEnrollmentAndUser) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(params.userId);
  const type = await enrollmentRepository.findTypeofEnrollment(params);

  await enrollmentRepository.createTypeofEnrollment(enrollment.id, type.id);
}

async function getTypeofEnrollment(enrollmentId: number) {
  const enrollment = await enrollmentRepository.getEnrollmentByUserId(enrollmentId);

  return enrollment;
}

export type CreateOrUpdateEnrollmentWithAddress = CreateEnrollmentParams & {
  address: CreateAddressParams;
};

const enrollmentsService = {
  getOneWithAddressByUserId,
  createOrUpdateEnrollmentWithAddress,
  createTypeforEnrollment,
  getTypeofEnrollment,
};

export default enrollmentsService;
