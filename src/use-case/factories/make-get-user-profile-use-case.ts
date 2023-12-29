import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUseProfileUseCase } from '../get-user-profile';

export function makeGetUserProfileUseCase(){
    const prismaUsersRepository = new PrismaUserRepository();
    const usecase = new GetUseProfileUseCase(prismaUsersRepository);

    return usecase;
}