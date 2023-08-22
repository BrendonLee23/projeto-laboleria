import { db } from "../database/database.connection.js";

export async function insertClient (name, address, phone) {
	return db.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)`, [name, address, phone]);
}
