const {
    ChapterPayloadSchema,
  } = require('./schema');
  const InvariantError = require('../../expceptions/InvariantError');
  
  const ChapterValidator = {
    validateChapterPayload: (payload) => {
      const validationResult = ChapterPayloadSchema.validate(payload);
      if (validationResult.error) {
        throw new InvariantError(validationResult.error.message);
      }
    },
  };
  
  module.exports = ChapterValidator;
  