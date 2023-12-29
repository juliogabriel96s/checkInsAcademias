import request from 'supertest';
import {app} from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';


describe('Create CheckIn (e2e)', () =>{

    beforeAll(async () =>{
        await app.ready();
    });

    afterAll(async() =>{
        await app.close();
    });

    it('should be able to create a check-in', async() =>{

        const {token} = await createAndAuthenticateUser(app);

        const gym =   await prisma.gym.create({
            data:{
                title: 'JavaScript Gym',
                latitude: -5.0713292,
                longitude: -38.0419733
            }
        });

        const response= await request(app.server)
            .post(`/gyms/${gym.id}/checkins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -5.0713292,
                longitude: -38.0419733
            });
        

        expect(response.statusCode).toEqual(201);
       
    });
});
