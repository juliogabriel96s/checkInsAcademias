import request from 'supertest';
import {app} from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';


describe('Nearby Gyms (e2e)', () =>{

    beforeAll(async () =>{
        await app.ready();
    });

    afterAll(async() =>{
        await app.close();
    });

    it('should be able to list nearby gyms', async() =>{

        const {token} = await createAndAuthenticateUser(app);


        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'javaScript gym',
                description: 'some description',
                phone: '13243487',
                latitude: -5.0713292,
                longitude: -38.0419733
            });

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript gym',
                description: 'some description',
                phone: '13243487',
                latitude: -5.098656,
                longitude: -38.377825
            });

        const response= await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -5.0713292,
                longitude: -38.0419733
            })
            .set('Authorization', `Bearer ${token}`)
            .send();
        

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'javaScript gym'
            })
        ]);
       
    });
});
