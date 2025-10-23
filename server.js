import { fastify } from 'fastify';
import { DataBaseMySql } from './database-mysql.js';

const server = fastify();
const db = new DataBaseMySql();

server.post('/videos', async (request,reply) => {

    const {title, description, duration} = request.body;

    await db.create({
        title,
        description,
        duration,
    });

    console.log(db.list());
    
    return reply.status(201).send();
});


server.get('/videos', async (request) => {
    const search = request.query.search;
    const videos = await db.list(search);
    return videos
});


server.put('/videos/:id', async (request,reply) => {
    const videoId = request.params.id;
    const {title, description, duration} = request.body;
    await db.update(videoId, {title, description, duration});

    return reply.status(204).send();
});


server.delete('/videos/:id', async (request,reply) => {
    const videoId = request.params.id;
    await db.delete(videoId);

    return reply.status(204).send();
});

server.listen({ 
    port: process.env.PORT ?? 3333}
);