import { Gym } from '@prisma/client';
import { GymsRepository } from '@/repositories/gym-repository';

interface FetchNearbyUseCaseRequest {
 userlatitude: number
 userlongitude: number

}

interface FetchNearbyUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyUseCase{
    constructor(private gymsRepository: GymsRepository){

    }

    async execute({
        userlatitude,
        userlongitude
    }: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseResponse>{
    
    
        const gyms =  await this.gymsRepository.findManyNearby({
            latitude: userlatitude,
            longitude: userlongitude
        });

        return { 
            gyms,
        };
    }
}

