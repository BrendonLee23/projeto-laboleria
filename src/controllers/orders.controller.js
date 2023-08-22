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
        res.status(201).json(orders.rows);

    } catch (err) {
        res.status(500).send(err.message);
    }
}






export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT id, name, phone, cpf, to_char(birthday, 'YYYY-MM-DD') as birthday FROM customers;`)
        res.send(customers.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCustomersById(req, res) {
    const { id } = req.params
    try {
        const customer = await db.query(`SELECT id, name, phone, cpf, to_char(birthday, 'YYYY-MM-DD') as birthday FROM customers WHERE id=${id};`)
        if (!customer.rows[0]) return res.sendStatus(404);
        res.send(customer.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        const cpfJaExiste = await db.query(`SELECT FROM customers WHERE cpf = $1`, [cpf])
        if (cpfJaExiste.rows.length > 0) {
            return res.status(409).send("Erro ao Cadastrar. CPF já cadastado")
        }
        const customer = await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function editCustomers(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try {
        const users = await db.query(`SELECT * FROM customers`);
        const cpfValidate  = users.rows.find(c => c.cpf === cpf);
        if(cpfValidate){
            if(cpfValidate.id != id){
                return res.status(409).send("Erro ao Cadastrar. CPF já cadastrado");
            }
        } 
        await db.query(`UPDATE customers SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}' WHERE id=$1;`, [id]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
