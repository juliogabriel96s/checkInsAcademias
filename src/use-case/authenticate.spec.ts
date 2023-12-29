import { expect, describe, it, beforeEach} from 'vitest';
import { inMemoryUsersRepository } from '@/repositories/inMemory/in-Memory-Users-Repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialErrors } from './errors/invalidCredentialErrors';

let userRepository: inMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate use case', () =>{

    beforeEach(() =>{
        userRepository = new inMemoryUsersRepository();
        sut = new AuthenticateUseCase(userRepository);
    });

    it('should be able to authenticate', async () =>{
      

        await userRepository.create({
            name: 'john Doe',
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6)
        });

        const {user} =  await sut.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        });
    
       
      
        await expect(user.id).toEqual(expect.any(String));
    });


    it('should not be able to authenticate with wrong email', async () =>{
        const userRepository = new inMemoryUsersRepository();
        const sut = new AuthenticateUseCase(userRepository);

        await expect( () => sut.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        })
        ).rejects.toBeInstanceOf(InvalidCredentialErrors);
    });

   
    
    it('should not be able to authenticate with wrong password', async () =>{
        const userRepository = new inMemoryUsersRepository();
        const sut = new AuthenticateUseCase(userRepository);

        await userRepository.create({
            name: 'john Doe',
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6)
        });

        await expect( () => sut.execute({
            email: 'johndoe@gmail.com',
            password: '123123'
        })
        ).rejects.toBeInstanceOf(InvalidCredentialErrors);
    });
});