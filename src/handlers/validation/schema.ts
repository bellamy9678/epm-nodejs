import Joi from 'joi';

export const updateUserSchema = Joi.object({
    login: Joi.string().min(3).alphanum().required().messages({
        'string.alphanum': 'login must only contain letters and digits'
    }),
    password: Joi.string().pattern(/[0-9]/).pattern(/[a-zA-Z]/).required().messages({
        'string.pattern.base': 'password must contain at least one letter and one digit'
    }),
    age: Joi.number().integer().less(130).greater(4).required().messages({
        'number.less': 'user’s age must be between 4 and 130',
        'number.greater': 'user’s age must be between 4 and 130'
    }),
    isDeleted: Joi.boolean().required(),
    id: Joi.string() // left optional to use uuid for generating id if it was not provided
});
