import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositoty';
import { ValidateCheckinUseCase } from '../validate-check-in';

export function makeValidatedCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository();
    const usecase = new ValidateCheckinUseCase(checkInsRepository);

    return usecase;
}