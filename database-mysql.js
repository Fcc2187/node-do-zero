import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DataBaseMySql {
    async list(search) {
        let query = "SELECT * FROM videos"; 

        if (search) {
            query += ` WHERE title LIKE ${sql.escape('%' + search + '%')}`;
        }

        const [videos] = await sql.query(query);
        return videos;
    }

    async create(video) {
        const id = randomUUID();
        const { title, description, duration } = video;
        await sql.query(
            "INSERT INTO videos (id, title, description, duration) VALUES (?, ?, ?, ?)",
            [id, title, description, duration]
        );
    }

    async update(id, video) {
        const { title, description, duration } = video;
        await sql.query(
            "UPDATE videos SET title = ?, description = ?, duration = ? WHERE id = ?",
            [title, description, duration, id]
        );
    }

    async delete(id) {
        await sql.query("DELETE FROM videos WHERE id = ?", [id]);
    }
}