import { insertCake, verifyCake, verifyFlavour } from "../repositories/cakes.repository.js";

// Função Testada e Finalizada.
export async function postCakes(req, res) {

    const { name, price, image, description, flavourId } = req.body;
    
    try {
    //Verificar se o nome do bolo já existe
    const cakeExists = await verifyCake(name);

    if (cakeExists.rows.length > 0) {
        return res.status(409).send("Cake name already exists");
    }

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

    // Validar se imagem não está vazio
    if (!image) {
        return res.status(400).send("Image is required");
    }

    //BÔNUS ********************************

    const flavourExists = await verifyFlavour(flavourId)
    if (flavourExists.rowCount <= 0) {
        return res.status(404).send("Invalid flavourId");
    }
    //BÔNUS ********************************

    // Criar um novo tipo de bolo com as informações fornecidas
    // Salvar o novo tipo de bolo no banco de dados
    await insertCake(name, price, image, description, flavourId)
    res.sendStatus(201);

    } catch (err) {
    res.status(500).send(err.message);
    }
}
