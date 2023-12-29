import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositoty';
import { CheckinUseCase } from '../check-in';
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymRepository();
    const usecase = new CheckinUseCase(checkInsRepository, gymsRepository);

    return usecase;
}