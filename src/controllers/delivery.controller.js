import { db } from "../database/database.connection.js";


// BÔNUS ************************************************

export async function updateOrderDeliveryStatus(req, res) {
    const orderId = req.params.id;

    try {
        // Verificar se o id é um número válido
        if (isNaN(orderId)) {
            return res.status(400).send("Invalid order ID");
        }

        // Verificar se o pedido com o id especificado existe
        const orderExists = await db.query(`SELECT * FROM orders WHERE id = $1`, [orderId]);
        if (orderExists.rowCount === 0) {
            return res.status(404).send("Order not found");
        }

        // Atualizar o status de entrega (isDelivered) para true
        await db.query(`UPDATE orders SET "isDelivered" = true WHERE id = $1`, [orderId]);
        
        res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    }
}
