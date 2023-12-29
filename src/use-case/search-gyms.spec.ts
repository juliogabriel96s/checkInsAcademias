import { expect, describe, it, beforeEach} from 'vitest';
import { inMemoryGymsRepository } from '@/repositories/inMemory/in-Memory-Gyms-Repository';
import { SearchGymsUseCase } from './search-gyms';




let gymsRepository: inMemoryGymsRepository;
let sut: SearchGymsUseCase;


describe('Search Gyms Use Case', () =>{

    beforeEach(async () =>{
        gymsRepository = new inMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);

     
    });

  

    it('should be able to search for gyms', async () =>{
        await gymsRepository.create({
            title: 'Javascript Gym',
            description: null,
            phone: null,
            latitude: -5.0713292,
            longitude: -38.0419733

        });

        await gymsRepository.create({
            title: 'Typescript Gym',
            description: null,
            phone: null,
            latitude: -5.0713292,
            longitude: -38.0419733
    
        });
   

        const {gyms} =  await sut.execute({
            query: 'Javascript',
            page: 1
           
        });
    
       
      
        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Javascript Gym'})
        ]);
    });


   

    it('should be able to fetch paginated gyms search', async () =>{
        for(let i = 1; i<= 22; i++)
   
            await gymsRepository.create({
                title: `Javascript Gym ${i}`,
                description: null,
                phone: null,
                latitude: -5.0713292,
                longitude: -38.0419733
            });
        const {gyms} =  await sut.execute({
            query: 'Javascript',
            page: 2
        });
    
       
      
        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Javascript Gym 21'}),
            expect.objectContaining({ title: 'Javascript Gym 22'})
        ]);
    });


});