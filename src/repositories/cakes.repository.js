import { db } from "../database/database.connection.js";

export async function verifyCake (name) {
	return db.query(`SELECT * FROM cakes WHERE name=$1`, [name])
}

export async function insertCake (name, price, image, description, flavourId) {
	return db.query(`INSERT INTO cakes (name, price, image, description, "flavourId") VALUES ($1, $2, $3, $4, $5)`, [name, price, image, description, flavourId]);
}

//BÔNUS ********************************

export async function verifyFlavour(flavourId) {
    const query = "SELECT * FROM flavours WHERE id = $1";
    const result = await db.query(query, [flavourId]);
    return result;
}

//BÔNUS ********************************