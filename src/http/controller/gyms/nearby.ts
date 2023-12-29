import {z} from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchNearbyGymUseCase } from '@/use-case/factories/make-fetch-nearby-gym-use-case';

export async function nearby(request: FastifyRequest, reply: FastifyReply){
    const nearbyGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180;
        }) 
    });

    const {latitude, longitude} = nearbyGymsQuerySchema.parse(request.query);

   

    const fetchNearbyGymsUseCase = makeFetchNearbyGymUseCase();


    const {gyms} =   await fetchNearbyGymsUseCase.execute({
        userlatitude: latitude,
        userlongitude: longitude
    });
    

    return reply.status(200).send({gyms});
}