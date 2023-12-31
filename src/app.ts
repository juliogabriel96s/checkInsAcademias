import fastify from 'fastify';
import {  usersRoutes } from './http/controller/users/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { fastifyJwt } from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { gymsRoutes } from './http/controller/gyms/routes';
import { checkInsRoutes } from './http/controller/check-ins/routes';


export const app = fastify();

app.register(fastifyJwt,{
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign:{
        expiresIn: '10m'
    }
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) =>{
    if(error instanceof ZodError){
        return reply.status(400).send({message: 'validation error', issues: error.format()});
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error);
    }else{
        // TODO: here we should log to an external tool like DataDog/NewRelic/Sentry
    }
    return reply.status(500).send({message: 'Internal server error'});
});

