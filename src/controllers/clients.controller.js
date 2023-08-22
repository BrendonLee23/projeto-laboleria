import {insertClient} from '../repositories/clients.repository.js';

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
        await insertClient(name, address, phone);
        
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

