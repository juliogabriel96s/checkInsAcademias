import {z} from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCheckInUseCase } from '@/use-case/factories/make-check-in-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply){

    const createCheckInsParamsSchema = z.object({
        gymId: z.string().uuid()
    });

    const createCheckInsBodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180;
        }) 
    });

    const { latitude, longitude} = createCheckInsBodySchema.parse(request.body);
    const { gymId} = createCheckInsParamsSchema.parse(request.params);

   

    const checkInsUseCase = makeCheckInUseCase();


    await checkInsUseCase.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    });
    

    return reply.status(201).send();
}