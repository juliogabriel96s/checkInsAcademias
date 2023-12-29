import { expect, describe, it, beforeEach} from 'vitest';
import { inMemoryCheckInsRepository } from '@/repositories/inMemory/in-memory-check-ins-repository';
import { GetMetricUseCase } from './get-users-metrics';




let checkInsRepository: inMemoryCheckInsRepository;
let sut: GetMetricUseCase;


describe('Get Use Metrics Use Case', () =>{

    beforeEach(async () =>{
        checkInsRepository = new inMemoryCheckInsRepository();
        sut = new GetMetricUseCase(checkInsRepository);

     
    });

  

    it('should be able to get checkins count from metrics', async () =>{
        await checkInsRepository.create({
            gymId: 'gym-01',
            user_Id: 'user-01',

        });

        await checkInsRepository.create({
            gymId: 'gym-02',
            user_Id: 'user-01',
    
        });
   

        const {checkInsCount} =  await sut.execute({
            userId: 'user-01',
           
        });
    
       
      
        expect(checkInsCount).toEqual(2);
    });

});