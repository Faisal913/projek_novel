const Joi = require('joi');

const ChapterPayloadSchema = Joi.object({
  no_chapter: Joi.string().max(100).required(),
  tgl_chapter: Joi.date().required(),
  isi_chapter: Joi.string().required(),
  id_admin: Joi.number().integer().required(),
  id_novel: Joi.number().integer().optional().allow(null),
});

module.exports = { ChapterPayloadSchema };
