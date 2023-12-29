import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositoty';
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository();
    const usecase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

    return usecase;
}