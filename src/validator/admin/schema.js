const Joi = require('joi');

const AdminPayloadSchema = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().min(8).max(255).required(),
  name_admin: Joi.string().max(50).required(),
});

module.exports = { AdminPayloadSchema };