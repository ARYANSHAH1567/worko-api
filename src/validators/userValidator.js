const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).required(),
    age: Joi.number().integer().min(18).required(),
    city: Joi.string().required(),
    zipCode: Joi.string().pattern(new RegExp('^[0-9]{5}$')).required(),
});

module.exports = {
    validateUser: (user) => userSchema.validate(user),
};
