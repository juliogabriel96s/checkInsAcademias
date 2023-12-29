import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUserCase } from '../register';

export function makeRegisterUseCase(){
    const prismaUsersRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUserCase(prismaUsersRepository);

    return registerUseCase;
}