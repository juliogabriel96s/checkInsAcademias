import {z} from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialErrors } from '@/use-case/errors/invalidCredentialErrors';
import { makeAuthenticateUseCase } from '@/use-case/factories/make-authenticate-use-case';

export async function authenticate(request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { email, password} = authenticateBodySchema.parse(request.body);

    try{

        const authenticateUseCase = makeAuthenticateUseCase();


        const {user} = await authenticateUseCase.execute({
            email, 
            password
        });

        const token = await reply.jwtSign({}, {
            sign:{
                sub: user.id
            }
        });

        const refreshToken = await reply.jwtSign({}, {
            sign:{
                sub: user.id,
                expiresIn: '7d'
            }
        });

        return reply
            .setCookie('refreshToken', refreshToken,{
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({
                token
            });
    }catch(err){
        if(err instanceof InvalidCredentialErrors){
            return reply.status(400).send({message: err.message});
        }
    
        throw err;
       
    }

    // return reply.status(200).send();
}