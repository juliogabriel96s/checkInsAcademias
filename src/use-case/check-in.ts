import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gym-repository';
import { ResourceNotFoundError } from './errors/resource-not-exists';
import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinate';
import { MaxNumberOfCheckInsError } from './errors/max-numbers-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

interface CheckinUseCaseRequest{
userId: string;
gymId: string;
userLatitude: number;
userLongitude: number;
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn
}

export class CheckinUseCase {
    constructor(
        private checkinsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ){}

    async execute({userId, gymId, userLatitude, userLongitude}: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse>{

        const gym = await this.gymsRepository.findById(gymId);

        if(!gym){
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinate(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        );

        const Max_distance_In_Kilometers = 0.1;

        if(distance > Max_distance_In_Kilometers){
            throw new MaxDistanceError();
        }

        const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
            userId,
            new Date()
        );

        if(checkInOnSameDay){
            throw new MaxNumberOfCheckInsError();
        }

        const checkIn = await this.checkinsRepository.create({
            gymId: gymId,
            user_Id: userId
        });

        return {
            checkIn
        };

    }
}