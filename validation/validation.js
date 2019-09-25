const Joi = require('@hapi/joi');

//Registration validation
const registrationValidation = (data) =>{
    const schema ={
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};

const loginValidation = (data) =>{
    const schema ={
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};

const postsValidation = (data) =>{
    const schema ={
        title: Joi.string()
            .min(3)
            .required(),
        description: Joi.string()
            .min(10)
            .required()
    };
    return Joi.validate(data, schema);
};

const commentValidation = (data) =>{
    const schema ={
        description: Joi.string()
            .min(3)
            .required()
    };
    return Joi.validate(data, schema);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.postsValidation = postsValidation;
module.exports.commentValidation = commentValidation;
