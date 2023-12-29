import { expect, describe, it, beforeEach} from 'vitest';
import { RegisterUserCase } from './register';
import { compare } from 'bcryptjs';
import { inMemoryUsersRepository } from '@/repositories/inMemory/in-Memory-Users-Repository';
import { UserAlreadyExistsError } from './errors/userAlreadyExists';


let userRepository: inMemoryUsersRepository;
let sut: RegisterUserCase;


describe('Register use case', () =>{

    beforeEach(() =>{
        userRepository = new inMemoryUsersRepository();
        sut = new RegisterUserCase(userRepository);
    });

    it('should be able to register', async () =>{
      

        const {user} =  await sut.execute({
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });
    
       
      
        await expect(user.id).toEqual(expect.any(String));
    });

    it('should hash user password upon registration', async () =>{
    

        const {user} =  await sut.execute({
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });
    
        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        );
      
        await expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async () =>{
     

        const email = 'johndoe@gmail.com';

        await sut.execute({
            name: 'John doe',
            email,
            password: '123456'
        });

        
        await expect(() => sut.execute({
            name: 'John doe',
            email,
            password: '123456'
        }) ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    
       
    });
});