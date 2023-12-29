import { expect, describe, it, beforeEach} from 'vitest';
import { inMemoryUsersRepository } from '@/repositories/inMemory/in-Memory-Users-Repository';
import { hash } from 'bcryptjs';
import { GetUseProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-exists';

let userRepository: inMemoryUsersRepository;
let sut: GetUseProfileUseCase;

describe('Get use profile Use case', () =>{

    beforeEach(() =>{
        userRepository = new inMemoryUsersRepository();
        sut = new GetUseProfileUseCase(userRepository);
    });

    it('Should be able to get user profile', async () =>{
      

        const createdUser = await userRepository.create({
            name: 'john Doe',
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6)
        });

        const {user} =  await sut.execute({
            userId: createdUser.id
        });
    
       
      
    
        expect(user.name).toEqual( 'john Doe');
    });


    it('should not be able to get user profile with wrong id', async () =>{
    

        expect( () => sut.execute({
            userId: 'non-exists-id'
        })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

   
    

});