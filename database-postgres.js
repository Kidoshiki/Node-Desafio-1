import { randomUUID } from 'node:crypto';
import { sql } from './Db.js';

export default class DatabasePostgres { 
    #videos = new Map();

    async list(search) {
        let videos;

        if (search) {
            videos = await sql`SELECT * FROM videos WHERE title ILIKE ${'%' + search + '%'}`;
        } else {
            videos = await sql`SELECT * FROM videos`;
        }

        return videos;
    }

    async create(video) {
        const videoid = randomUUID();
        const { title, description, duration } = video;

        // Verifique se todos os valores estão definidos
        if (!title || !description || !duration) {
            throw new Error('Missing required fields');
        }

        await sql`
            INSERT INTO videos (id, title, description, duration) 
            VALUES (${videoid}, ${title}, ${description}, ${duration})
        `;
    }

    async update(id, video) {
        const { title, description, duration } = video;

        await sql`
            UPDATE videos
            SET title = ${title}, description = ${description}, duration = ${duration}
            WHERE id = ${id}
        `;
    }

    async delete(id) {
        await sql`
            DELETE FROM videos
            WHERE id = ${id}
        `;
    }
}