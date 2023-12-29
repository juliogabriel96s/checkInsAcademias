import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositoty';
import { GetMetricUseCase } from '../get-users-metrics';

export function makeGetUserMetricsUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository();
    const usecase = new GetMetricUseCase(checkInsRepository);

    return usecase;
}