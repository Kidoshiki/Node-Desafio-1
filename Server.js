import { fastify } from 'fastify';
import DatabasePostgres from './database-postgres.js';

const server = fastify();

const database = new DatabasePostgres();

server.post('/videos', async (request, reply) => {
    try {
        const { title, description, duration } = request.body;

        console.log(request.body);

        // Verifique se todos os valores estão definidos
        if (!title || !description || !duration) {
            return reply.status(400).send({ error: 'Missing required fields' });
        }

        await database.create({
            title,
            description,
            duration,
        });

        return reply.status(201).send();
    } catch (error) {
        console.error('Erro ao criar vídeo:', error);
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
});

server.get('/videos', async (request, reply) => {
    try {
        const search = request.query.search;

        console.log(search);

        const videos = await database.list(search);

        console.log(videos);

        return videos;
    } catch (error) {
        console.error('Erro ao listar vídeos:', error);
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
});

server.put('/videos/:id', async (request, reply) => {
    try {
        const videoId = request.params.id;
        const { title, description, duration } = request.body;

        await database.update(videoId, {
            title,
            description,
            duration,
        });

        return reply.status(204).send();
    } catch (error) {
        console.error('Erro ao atualizar vídeo:', error);
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
});

server.delete('/videos/:id', async (request, reply) => {
    try {
        const videoId = request.params.id;

        await database.delete(videoId);

        return reply.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar vídeo:', error);
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
});

server.listen({ 
    port: process.env.PORT ?? 3333,
});