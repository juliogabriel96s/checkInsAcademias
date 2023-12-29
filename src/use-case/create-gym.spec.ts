import { expect, describe, it, beforeEach} from 'vitest';
import { inMemoryGymsRepository } from '@/repositories/inMemory/in-Memory-Gyms-Repository';
import { CreateGymUseCase } from './create-gym';



let gymsRepository: inMemoryGymsRepository;
let sut: CreateGymUseCase;


describe('Create gym use case', () =>{

    beforeEach(() =>{
        gymsRepository = new inMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it('should be able to create gyms', async () =>{
      

        const {gym} =  await sut.execute({
            title: 'JavaScript Gyms',
            description: null,
            phone: null,
            latitude: -5.0713292,
            longitude: -38.0419733
        });
    
       
      
        expect(gym.id).toEqual(expect.any(String));
    });

   
});