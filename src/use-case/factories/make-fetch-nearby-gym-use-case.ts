import { FetchNearbyUseCase } from '../fetch-nearby-gym';
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeFetchNearbyGymUseCase(){
    const gymsRepository = new PrismaGymRepository();
    const usecase = new FetchNearbyUseCase(gymsRepository);

    return usecase;
}