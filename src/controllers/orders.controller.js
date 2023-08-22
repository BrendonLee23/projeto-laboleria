import { db } from "../database/database.connection.js";


export async function createOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {

        
        const clientExists = await db.query(`SELECT * FROM clients WHERE id=$1`, [clientId])
        if (clientExists.rows.length <= 0) {
            return res.status(404).send("The customer does not exist");
        }
        const cakeExists = await db.query(`SELECT * FROM cakes WHERE id=$1`, [cakeId])
        if (cakeExists.rows.length <= 0) {
            return res.status(404).send("The cake does not exist");
        }
        // Validar se quantity é um número inteiro entre 1 e 4
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 4) {
            return res.status(400).send("Invalid quantity");
        }

        const cake = cakeExists.rows[0]; // Acessar o primeiro elemento da matriz
        const valorBolo = cake.price;


        // Calcular o valor total do pedido
        const valorTotalPedido = quantity * valorBolo;

        // Verificar se o valor total do pedido corresponde ao totalPrice
        if (valorTotalPedido !== totalPrice) {
            return res.status(400).send("Total price does not match calculated value");
        }

        // Aqui você pode inserir as informações da nova order no banco de dados
        await db.query(`INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4)`, [clientId, cakeId, quantity, totalPrice]);
        /* res.sendStatus(201); */
        const orders = await db.query(`SELECT * FROM orders`)
        const formattedOrders = orders.rows.map(order => {
            return {
                id: order.id,
                clientId: order.clientId,
                cakeId: order.cakeId,
                quantity: order.quantity,
                totalPrice: order.totalPrice,
                createdAt: order.createdAt.toISOString().substr(0, 10) // Formatar a data
            };
        });
        res.status(201).json(formattedOrders);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getOrders(req, res) {
    try {
        let query = `
            SELECT
                orders.id AS "orderId",
                orders."createdAt",
                orders.quantity,
                orders."totalPrice",
                clients.id AS "clientId",
                clients.name AS "clientName",
                clients.address AS "clientAddress",
                clients.phone AS "clientPhone",
                cakes.id AS "cakeId",
                cakes.name AS "cakeName",
                cakes.price AS "cakePrice",
                cakes.description AS "cakeDescription",
                cakes.image AS "cakeImage"
            FROM
                orders
                JOIN clients ON orders."clientId" = clients.id
                JOIN cakes ON orders."cakeId" = cakes.id
        `;

        const { date } = req.query;
        if (date) {
            query += ` WHERE DATE(orders."createdAt") = $1`;
        }

        const orders = await db.query(query, [date]);

        if (orders.rows.length === 0) {
            return res.status(404).send([]);
        }

        const formattedOrders = orders.rows.map(order => {
            return {
                client: {
                    id: order.clientId,
                    name: order.clientName,
                    address: order.clientAddress,
                    phone: order.clientPhone
                },
                cake: {
                    id: order.cakeId,
                    name: order.cakeName,
                    price: order.cakePrice,
                    description: order.cakeDescription,
                    image: order.cakeImage
                },
                orderId: order.orderId,
                createdAt: order.createdAt,
                quantity: order.quantity,
                totalPrice: order.totalPrice
            };
        });

        res.status(200).json(formattedOrders);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getOrderById(req, res) {

    const orderId = req.params.id; // Obtém o id do pedido da URL

    try {
        const query = `
            SELECT
                orders.id AS "orderId",
                orders."createdAt",
                orders.quantity,
                orders."totalPrice",
                clients.id AS "clientId",
                clients.name AS "clientName",
                clients.address AS "clientAddress",
                clients.phone AS "clientPhone",
                cakes.id AS "cakeId",
                cakes.name AS "cakeName",
                cakes.price AS "cakePrice",
                cakes.description AS "cakeDescription",
                cakes.image AS "cakeImage"
            FROM
                orders
                JOIN clients ON orders."clientId" = clients.id
                JOIN cakes ON orders."cakeId" = cakes.id
            WHERE
                orders.id = $1
        `;

        const result = await db.query(query, [orderId]);

        if (result.rows.length === 0) {
            return res.status(404).send("Order not found");
        }

        const order = result.rows[0];

        const formattedOrder = {
            client: {
                id: order.clientId,
                name: order.clientName,
                address: order.clientAddress,
                phone: order.clientPhone
            },
            cake: {
                id: order.cakeId,
                name: order.cakeName,
                price: order.cakePrice,
                description: order.cakeDescription,
                image: order.cakeImage
            },
            orderId: order.orderId,
            createdAt: order.createdAt,
            quantity: order.quantity,
            totalPrice: order.totalPrice
        };

        res.status(200).json(formattedOrder);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function ordersByClient(req, res) {

    const clientId = req.params.id; // Obtém o id do cliente da URL

    try {
        const clientExists = await db.query(`SELECT * FROM clients WHERE id = $1`, [clientId]);

        if (clientExists.rows.length === 0) {
            return res.status(404).send("Client not found");
        }

        const query = `
            SELECT
                orders.id AS "orderId",
                orders.quantity,
                orders."createdAt",
                orders."totalPrice",
                cakes.name AS "cakeName"
            FROM
                orders
                JOIN cakes ON orders."cakeId" = cakes.id
            WHERE
                orders."clientId" = $1
        `;

        const orders = await db.query(query, [clientId]);

        if (orders.rows.length === 0) {
            return res.status(200).send("No orders registered for this client");
        }

        const formattedOrders = orders.rows.map(order => {
            return {
                orderId: order.orderId,
                quantity: order.quantity,
                createdAt: order.createdAt,
                totalPrice: order.totalPrice,
                cakeName: order.cakeName
            };
        });

        res.status(200).json(formattedOrders);

    } catch (err) {
        res.status(500).send(err.message);
    }
}


