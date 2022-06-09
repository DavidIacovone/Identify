const joi = require('@hapi/joi');

const registerSchema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().required().email(),
    password: joi.string().required().min(6)
});

const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6)
});


module.exports = { registerSchema, loginSchema }