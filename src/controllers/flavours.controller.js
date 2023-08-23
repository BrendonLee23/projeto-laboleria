import { db } from "../database/database.connection.js";

// BÔNUS ************************************************

export async function createFlavour(req, res) {
    const { name } = req.body;

    try {
        // Validar se o nome não é vazio e tem pelo menos 2 caracteres
        if (!name || name.length < 2) {
            return res.status(400).send("Invalid flavour name");
        }

        // Verificar se o sabor já existe
        const flavourExists = await db.query(`SELECT * FROM flavours WHERE name = $1`, [name]);
        if (flavourExists.rowCount > 0) {
            return res.status(409).send("Flavour name already exists");
        }

        // Inserir o novo sabor na tabela flavours
        await db.query(`INSERT INTO flavours (name) VALUES ($1)`, [name]);
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}
