import request from 'supertest';
import {app} from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';


describe('Validate CheckIn (e2e)', () =>{

    beforeAll(async () =>{
        await app.ready();
    });

    afterAll(async() =>{
        await app.close();
    });

    it('should be able to validate a check-in', async() =>{

        const {token} = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow();

        const gym =   await prisma.gym.create({
            data:{
                title: 'JavaScript Gym',
                latitude: -5.0713292,
                longitude: -38.0419733
            }
        });

        let checkInId =  await prisma.checkIn.create({
            data:{
                gymId: gym.id,
                user_Id: user.id
            }
        });

        const response= await request(app.server)
            .patch(`/check-ins/${checkInId.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send();
        

        expect(response.statusCode).toEqual(204);

        checkInId = await prisma.checkIn.findUniqueOrThrow({
            where:{
                id: checkInId.id
            }
        });

        expect(checkInId.validated_at).toEqual(expect.any(Date));
       
    });
});
