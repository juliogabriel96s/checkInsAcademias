import { CheckInsRepository } from '@/repositories/check-ins-repository';


interface GetMetricUseCaseRequest{
userId: string;

}

interface GetMetricUseCaseResponse {
    checkInsCount: number
}

export class GetMetricUseCase {
    constructor(
        private checkinsRepository: CheckInsRepository,
    ){}

    async execute({userId}: GetMetricUseCaseRequest): Promise<GetMetricUseCaseResponse>{

        const checkInsCount = await this.checkinsRepository.countByUserId(userId);

        return {
            checkInsCount
        };

    }
}