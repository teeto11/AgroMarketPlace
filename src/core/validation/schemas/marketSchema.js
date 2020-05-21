const Joi = require('@hapi/joi');
module.exports = Joi.object().keys({
   name: Joi.string().required(),
   description: Joi.string().required(),
   category: Joi.string().required(),
   latitude: Joi.string().required(),
   longitude: Joi.string().required(),
   image: Joi.string().required,
});
