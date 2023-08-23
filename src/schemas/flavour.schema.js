import joi from "joi";

// BÔNUS ************************************************

const flavourSchema = joi.object({
    name: joi.string().min(2).required()
});

export default flavourSchema;