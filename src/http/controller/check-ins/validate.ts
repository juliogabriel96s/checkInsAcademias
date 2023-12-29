import {z} from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeValidatedCheckInUseCase } from '@/use-case/factories/make-validated-check-in-use-case';

export async function validate(request: FastifyRequest, reply: FastifyReply){

    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid()
    });

   
  
    const { checkInId} = validateCheckInParamsSchema.parse(request.params);

   

    const validateCheckInUseCase = makeValidatedCheckInUseCase();


    await validateCheckInUseCase.execute({
        checkInId,
    });
    

    return reply.status(204).send();
}