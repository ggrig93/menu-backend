import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const loginValidator = Joi.object({
    email: Joi.string().regex(emailRegex, 'email-reg').trim().required()
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === 'string.pattern.name' && err.local && err.local.name === 'email-reg') {
                    err.message = 'Invalid Email';
                }
            });
            return errors;
        }),
    password: Joi.string().trim().required()
});

const createMenuPositionValidator = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    price: Joi.number().required(),
    categoryId: Joi.required()
});

const updateMenuPositionValidator = Joi.object({
    name: Joi.string().trim(),
    description: Joi.string().trim(),
    price: Joi.number(),
    image: Joi.string(),
    categoryId: Joi.string()
});

export {
    loginValidator,
    createMenuPositionValidator,
    updateMenuPositionValidator
};
