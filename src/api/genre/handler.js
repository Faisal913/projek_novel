const ClientError = require('../../expceptions/ClientError');

class GenreHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postGenreHandler = this.postGenreHandler.bind(this);
    this.getGenresHandler = this.getGenresHandler.bind(this);
    this.getGenreByIdHandler = this.getGenreByIdHandler.bind(this);
    this.putGenreByIdHandler = this.putGenreByIdHandler.bind(this);
    this.deleteGenreByIdHandler = this.deleteGenreByIdHandler.bind(this);
  }

  async postGenreHandler(request, h) {
    try {
      this._validator.validateGenrePayload(request.payload);
      const { nama_genre, id_admin } = request.payload;

      const genreId = await this._service.addGenre({ nama_genre, id_admin });

      const response = h.response({
        status: 'success',
        message: 'Genre berhasil ditambahkan',
        data: {
          genreId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async getGenresHandler() {
    const genres = await this._service.getGenres();
    return {
      status: 'success',
      data: {
        genres,
      },
    };
  }

  async getGenreByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const genre = await this._service.getGenreById(id);

      return {
        status: 'success',
        data: {
          genre,
        },
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async putGenreByIdHandler(request, h) {
    try {
      this._validator.validateGenrePayload(request.payload);
      const { id } = request.params;
      const { nama_genre, id_admin } = request.payload;

      await this._service.editGenreById(id, { nama_genre, id_admin });

      return {
        status: 'success',
        message: 'Genre berhasil diperbarui',
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async deleteGenreByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteGenreById(id);

      return {
        status: 'success',
        message: 'Genre berhasil dihapus',
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  _handleError(error, h) {
    if (error instanceof ClientError) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(error.statusCode);
      return response;
    }

    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);
    console.error(error);
    return response;
  }
}

module.exports = GenreHandler;
