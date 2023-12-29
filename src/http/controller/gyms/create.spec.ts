import request from 'supertest';
import {app} from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';


describe('Create gym (e2e)', () =>{

    beforeAll(async () =>{
        await app.ready();
    });

    afterAll(async() =>{
        await app.close();
    });

    it('should be able to create gym', async() =>{

        const {token} = await createAndAuthenticateUser(app);

        const response= await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'java Script gym',
                description: 'some description',
                phone: '13243487',
                latitude: -5.0713292,
                longitude: -38.0419733
            });
        

        expect(response.statusCode).toEqual(201);
       
    });
});
