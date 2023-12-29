import { expect, describe, it, beforeEach, vi, afterEach} from 'vitest';
import { inMemoryCheckInsRepository } from '@/repositories/inMemory/in-memory-check-ins-repository';
import { CheckinUseCase } from './check-in';
import { inMemoryGymsRepository } from '@/repositories/inMemory/in-Memory-Gyms-Repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-numbers-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';



let checkInsRepository: inMemoryCheckInsRepository;
let gymsRepository: inMemoryGymsRepository;
let sut: CheckinUseCase;


describe('Check-in  use case', () =>{

    beforeEach(async () =>{
        checkInsRepository = new inMemoryCheckInsRepository();
        gymsRepository = new inMemoryGymsRepository();
        sut = new CheckinUseCase(checkInsRepository, gymsRepository);

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Javascript gym',
            description: '',
            phone: '',
            latitude: -5.0713292,
            longitude: -38.0419733
        });

        vi.useFakeTimers();
    });

    afterEach(() =>{
        vi.useRealTimers();
    });

    it('should be able to check in', async () =>{

   

        const {checkIn} =  await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.0713292,
            userLongitude: -38.0419733
        });
    
       
      
        await expect(checkIn.id).toEqual(expect.any(String));
    });


    it('should not be able to check in twice in the same day', async () =>{
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
      
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.0713292,
            userLongitude: -38.0419733
        });

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.0713292,
            userLongitude: -38.0419733
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });


    it('should be able to check in twice but in different days', async () =>{
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
      
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.0713292,
            userLongitude: -38.0419733
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.0713292,
            userLongitude: -38.0419733
        });
        

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should not be able to check in on distant gym', async () =>{
   
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Javascript gym',
            description: '',
            phone: '',
            latitude: new Decimal( -5.1007387),
            longitude: new Decimal(-38.0584528)
        });

    
        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -5.0713292,
            userLongitude: -38.0419733
        }) ).rejects.toBeInstanceOf(MaxDistanceError);
    });

});