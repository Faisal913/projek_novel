const Joi = require('joi');

const GenrePayloadSchema = Joi.object({
  nama_genre: Joi.string().max(20).required(),
  id_admin: Joi.number().integer().required(),
});

module.exports = { GenrePayloadSchema };
