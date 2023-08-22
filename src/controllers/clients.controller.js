import { db } from "../database/database.connection.js";

// Função Testada e Finalizada.
export async function createClient(req, res) {
    const { name, address, phone } = req.body;

    try {
        // Validar se o nome não é vazio
        if (!name) {
            return res.status(400).send("Name is required");
        }

        // Validar se o endereço não é vazio
        if (!address) {
            return res.status(400).send("Address is required");
        }

        // Validar se o telefone não é vazio e tem 10 ou 11 caracteres numéricos(a mesa validação é realizada no schema de clientes)
        if (!phone || !/^\d{10,11}$/.test(phone)) {
            return res.status(400).send("Invalid phone number");
        }

        // Aqui você pode inserir as informações do novo cliente no banco de dados, se necessário
        await db.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3)`, [name, address, phone]);
        res.sendStatus(201);
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
