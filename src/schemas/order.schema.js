import joi from "joi"

const orderSchema = joi.object({
    clientId: joi.number().integer().positive().required(),
    cakeId: joi.number().integer().positive().required(),
    quantity: joi.number().integer().positive().required(),
    createdAt: joi.date().required(),
    totalPrice: joi.number().positive().required()
});

export default orderSchema;