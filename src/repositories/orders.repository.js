import { db } from "../database/database.connection.js";

async function verifyClient (payload) {
    const clientId = payload;
	const clientResult = db.query(`SELECT * FROM clients WHERE id=$1`, [clientId])
    return clientResult
}
async function verifyCake (payload) {
    const  cakeId  = payload;
	const cakeResult = db.query(`SELECT * FROM cakes WHERE id=$1`, [cakeId])
    return cakeResult;
}
async function insertOrder (clientId, cakeId, quantity, totalPrice) {
	return db.query(`INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4)`, [clientId, cakeId, quantity, totalPrice]);
}
export async function joinData(date) {
    let query = `
        SELECT
            orders.id AS "orderId",
            orders."createdAt",
            orders.quantity,
            orders."totalPrice",
            orders."isDelivered",
            clients.id AS "clientId",
            clients.name AS "clientName",
            clients.address AS "clientAddress",
            clients.phone AS "clientPhone",
            cakes.id AS "cakeId",
            cakes.name AS "cakeName",
            cakes.price AS "cakePrice",
            cakes.description AS "cakeDescription",
            cakes.image AS "cakeImage",
            cakes."flavourId",
            flavours.id AS "flavourId",
            flavours.name AS "flavourName"
        FROM
            orders
            JOIN clients ON orders."clientId" = clients.id
            JOIN cakes ON orders."cakeId" = cakes.id
            JOIN flavours ON cakes."flavourId" = flavours.id
    `;
        
    if (date) {
        query += `WHERE DATE(orders."createdAt") = $1`;
    }

    return db.query(query, [date]);
}
async function joinDataById(orderId){

    const query = `
    SELECT
        orders.id AS "orderId",
        orders."createdAt",
        orders.quantity,
        orders."totalPrice",
        orders."isDelivered",
        clients.id AS "clientId",
        clients.name AS "clientName",
        clients.address AS "clientAddress",
        clients.phone AS "clientPhone",
        cakes.id AS "cakeId",
        cakes.name AS "cakeName",
        cakes.price AS "cakePrice",
        cakes.description AS "cakeDescription",
        cakes.image AS "cakeImage",
        cakes."flavourId",
        flavours.id AS "flavourId",
        flavours.name AS "flavourName"
    FROM
        orders
        JOIN clients ON orders."clientId" = clients.id
        JOIN cakes ON orders."cakeId" = cakes.id
        JOIN flavours ON cakes."flavourId" = flavours.id
    WHERE
        orders.id = $1
`;
        return db.query(query, [orderId]);
}
async function joinDataByClient(clientId){

    const query = `
    SELECT
        orders.id AS "orderId",
        orders.quantity,
        orders."createdAt",
        orders."totalPrice",
        orders."isDelivered",
        cakes.name AS "cakeName",
        cakes."flavourId",
        flavours.id AS "flavourId",
        flavours.name AS "flavourName"
    FROM
        orders
        JOIN cakes ON orders."cakeId" = cakes.id
        JOIN flavours ON cakes."flavourId" = flavours.id
    WHERE
        orders."clientId" = $1
`;
        return db.query(query, [clientId]);
}

const orderRepository = {
    verifyClient,
    verifyCake,
    insertOrder,
    joinData,
    joinDataById,
    joinDataByClient
}

export default orderRepository;
