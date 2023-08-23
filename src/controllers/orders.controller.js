import orderRepository  from "../repositories/orders.repository.js";

// Função Testada e Finalizada.
export async function createOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;
    console.log(clientId)
    try {
        const clientExists = await orderRepository.verifyClient(clientId)
        
        if (clientExists.rowCount <= 0) {
            return res.status(404).send("The customer does not exist");
        }
        const cakeExists = await orderRepository.verifyCake(cakeId)
        if (cakeExists.rowCount <= 0) {
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
        await orderRepository.insertOrder(clientId, cakeId, quantity, totalPrice)
        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}
// Função Testada e Finalizada.
export async function getOrders(req, res) {

    const { date } = req.query;

    try {
        const orders = await orderRepository.joinData(date)
        console.log(orders.rows)
        if (orders.rowCount === 0) {
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
                    image: order.cakeImage,
                    flavour: order.flavourName 
                },
                orderId: order.orderId,
                createdAt: order.createdAt,
                quantity: order.quantity,
                totalPrice: order.totalPrice,
                isDelivered: order.isDelivered
            };
        });

        res.status(200).json(formattedOrders);

    } catch (err) {
        res.status(500).send(err.message);
    }
}
// Função Testada e Finalizada.
export async function getOrderById(req, res) {

    const orderId = req.params.id; // Obtém o id do pedido da URL

    try {
        const result = await orderRepository.joinDataById(orderId)
        console.log(result.rowCount)
        if (result.rowCount === 0) {
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
                image: order.cakeImage,
                flavour: order.flavourName 
            },
            orderId: order.orderId,
            createdAt: order.createdAt,
            quantity: order.quantity,
            totalPrice: order.totalPrice,
            isDelivered: order.isDelivered
        };

        res.status(200).json(formattedOrder);

    } catch (err) {
        res.status(500).send(err.message);
    }
}
// Função Testada e Finalizada.
export async function ordersByClient(req, res) {

    const clientId = req.params.id; // Obtém o id do cliente da URL

    try {
        const clientExists = await orderRepository.verifyClient(clientId);

        console.log(clientExists.rowCount)
        if (clientExists.rowCount <= 0) {
            return res.status(404).send("Client not found");
        }
        const orders = await orderRepository.joinDataByClient(clientId)

        if (orders.rowCount === 0) {
            return res.status(200).send("No orders registered for this client");
        }

        const formattedOrders = orders.rows.map(order => {
            return {
                orderId: order.orderId,
                quantity: order.quantity,
                createdAt: order.createdAt,
                totalPrice: order.totalPrice,
                cakeName: order.cakeName,
                flavourName: order.flavourName,
                isDelivered: order.isDelivered
            };
        });

        res.status(200).json(formattedOrders);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

