import { FastifyInstance } from 'fastify';

import { verifyJWT } from '../../middlewares/verify-jwt';
import { create } from './create';
import { validate } from './validate';
import { metric } from './metric';
import { history } from './history';

export async function checkInsRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT);

    app.get('/checkIns/history', history);
    app.get('/checkIns/metrics', metric);

    app.post('/gyms/:gymId/checkins', create);
    app.patch('/check-ins/:checkInId/validate', validate);

   
}