import joi from "joi"

const orderSchema = joi.object({

    clientId: joi.number().integer().positive().required(),     // Validar se clientId é um número inteiro positivo.
    cakeId: joi.number().integer().positive().required(),       // Validar se cakeId é um número inteiro positivo.
    quantity: joi.number().integer().min(1).max(4).required(),  // Deve ser um número inteiro entre 1 e 4.
    totalPrice: joi.number().positive().required()
});

export default orderSchema;