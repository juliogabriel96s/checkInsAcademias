import { expect, describe, it, beforeEach, afterEach, vi} from 'vitest';
import { inMemoryCheckInsRepository } from '@/repositories/inMemory/in-memory-check-ins-repository';
import { ValidateCheckinUseCase } from './validate-check-in';
import { ResourceNotFoundError } from './errors/resource-not-exists';




let checkInsRepository: inMemoryCheckInsRepository;
let sut: ValidateCheckinUseCase;


describe('Validate check-in  use case', () =>{

    beforeEach(async () =>{
        checkInsRepository = new inMemoryCheckInsRepository();
        sut = new ValidateCheckinUseCase(checkInsRepository);

        vi.useFakeTimers();
    });

    afterEach(() =>{
        vi.useRealTimers();
    });

    it('should be able to validate the check-in', async () =>{
        const createdCheckIn  = await checkInsRepository.create({
            gymId: 'gym-01',
            user_Id: 'user-01'
        });


   

        const {checkIn} =  await sut.execute({
            checkInId: createdCheckIn.id
        });
    
       
      
        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
        
    });


    it('should not be able to validate an inexistent check-in', async () =>{



    
        await expect(() =>
            sut.execute({
                checkInId: 'inexistem-checkin-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
        
    });

    it('should not be able to validate the check-in after 20 minutes of its creation', async () =>{
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

        const createdCheckIn  = await checkInsRepository.create({
            gymId: 'gym-01',
            user_Id: 'user-01'
        });

        const twentyOneMinutesInMs = 1000 * 60 * 21;

        vi.advanceTimersByTime(twentyOneMinutesInMs);

        await expect(() => sut.execute({
            checkInId: createdCheckIn.id
        })).rejects.toBeInstanceOf(Error);
    });



});