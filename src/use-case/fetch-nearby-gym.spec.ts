import { expect, describe, it, beforeEach} from 'vitest';
import { inMemoryGymsRepository } from '@/repositories/inMemory/in-Memory-Gyms-Repository';
import { FetchNearbyUseCase } from './fetch-nearby-gym';




let gymsRepository: inMemoryGymsRepository;
let sut: FetchNearbyUseCase;


describe('Fetch Nearby Gyms Use Case', () =>{

    beforeEach(async () =>{
        gymsRepository = new inMemoryGymsRepository();
        sut = new FetchNearbyUseCase(gymsRepository);

     
    });

  

    it('should be able to fetch nearby gyms', async () =>{
        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -5.0713292,
            longitude: -38.0419733

        });

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -5.098656,
            longitude: -38.377825
    
        });
   

        const {gyms} =  await sut.execute({
            userlatitude: -5.0713292,
            userlongitude: -38.0419733
        });
    
       
      
        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Near Gym'})
        ]);
    });


});