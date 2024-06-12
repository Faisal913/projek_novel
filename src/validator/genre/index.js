const { GenrePayloadSchema } = require('./schema');
const InvariantError = require('../../expceptions/InvariantError');

const GenreValidator = {
  validateGenrePayload: (payload) => {
    const validationResult = GenrePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = GenreValidator;
