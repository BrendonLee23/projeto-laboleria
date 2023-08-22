import { db } from "../database/database.connection.js";
import { validateImageLink } from "../schemas/cake.schema.js";

export async function postCakes(req, res) {

    const { name, price, image, description } = req.body;

    try {
    //Verificar se o nome do bolo já existe
    const cakeExists = await db.query(`SELECT FROM cakes WHERE name = $1`, [name])
    if (cakeExists) {
        return res.status(409).send("Cake name already exists");          }

    // Validar se o nome não é vazio e tem pelo menos 2 caracteres
    if (!name || name.length < 2) {
        return res.status(400).send("Invalid cake name");
    }

    // Validar se o preço não é vazio e é maior que zero
    if (!price || price <= 0) {
        return res.status(400).send("Invalid cake price");
    }

    // Validar se a descrição é uma string (pode ser vazia)
    if (description !== undefined && typeof description !== "string") {
        return res.status(400).send("Invalid description");
    }

    // Validar se image é um link válido usando uma biblioteca como 'joi'
    const isValidImageLink = validateImageLink(image);
    if (!isValidImageLink) {
        return res.status(400).send("Invalid image link");
    }

    // Criar um novo tipo de bolo com as informações fornecidas
    // Salvar o novo tipo de bolo no banco de dados
    await db.query(`INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4)`, [name, price, image, description]);
    res.sendStatus(201);

    } catch (err) {
    res.status(500).send(err.message);
    }
}
