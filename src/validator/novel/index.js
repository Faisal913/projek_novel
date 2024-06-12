const { NovelPayloadSchema } = require('./schema');
const InvariantError = require('../../expceptions/InvariantError');

const NovelValidator = {
  validateNovelPayload: (payload) => {
    const validationResult = NovelPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NovelValidator;
