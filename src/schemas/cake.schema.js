import joi from "joi";

export const cakeSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().positive().required(),
    image: joi.string().uri().required(),
    description: joi.string().required()
});


export const validateImageLink = joi.object({

    image: joi.string().uri().required()

});


