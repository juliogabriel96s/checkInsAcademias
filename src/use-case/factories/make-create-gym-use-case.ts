import { CreateGymUseCase } from '../create-gym';
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeCreateGymUseCase(){
    const gymsRepository = new PrismaGymRepository();
    const usecase = new CreateGymUseCase(gymsRepository);

    return usecase;
}