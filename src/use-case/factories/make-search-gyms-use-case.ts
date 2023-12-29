import { SearchGymsUseCase } from '../search-gyms';
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeSearchGymsUseCase(){
    const gymsRepository = new PrismaGymRepository();
    const usecase = new SearchGymsUseCase(gymsRepository);

    return usecase;
}