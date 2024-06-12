const Joi = require('joi');

const NovelPayloadSchema = Joi.object({
  judul_novel: Joi.string().max(100).required(),
  deskripsi: Joi.string().required(),
  pengarang: Joi.string().max(50).required(),
  penerbit: Joi.string().max(50).allow(null, ''),
  tgl_rilis: Joi.date().allow(null, ''),
  img: Joi.string().max(255).required(),
  id_admin: Joi.number().integer().required(),
  id_genre: Joi.number().integer().allow(null),
});

module.exports = { NovelPayloadSchema };
