const ClientError = require('../../expceptions/ClientError');

class ChapterHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postChapterHandler = this.postChapterHandler.bind(this);
    this.getChapterByIdHandler = this.getChapterByIdHandler.bind(this);
    this.getChaptersHandler = this.getChaptersHandler.bind(this);
    this.putChapterByIdHandler = this.putChapterByIdHandler.bind(this);
    this.deleteChapterByIdHandler = this.deleteChapterByIdHandler.bind(this);
  }

  async postChapterHandler(request, h) {
    try {
      this._validator.validateChapterPayload(request.payload);
      const { no_chapter, tgl_chapter, isi_chapter, id_admin, id_novel } = request.payload;

      const chapterId = await this._service.addChapter({ no_chapter, tgl_chapter, isi_chapter, id_admin, id_novel });

      const response = h.response({
        status: 'success',
        message: 'Chapter berhasil ditambahkan',
        data: {
          chapterId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async getChapterByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const chapter = await this._service.getChapterById(id);

      return {
        status: 'success',
        data: {
          chapter,
        },
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async getChaptersHandler(request, h) {
    try {
      console.log('Calling getChapters...');
      const chapters = await this._service.getChapters();
      console.log('Chapters retrieved:', chapters);
      return {
        status: 'success',
        data: {
          chapters,
        },
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async putChapterByIdHandler(request, h) {
    try {
      this._validator.validateChapterPayload(request.payload);
      const { id } = request.params;
      await this._service.editChapterById(id, request.payload);

      return {
        status: 'success',
        message: 'Chapter berhasil diperbarui',
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async deleteChapterByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteChapterById(id);

      return {
        status: 'success',
        message: 'Chapter berhasil dihapus',
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

    // Server ERROR!
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
    });
    response.code(500);
    console.error(error);
    return response;
  }
}

module.exports = ChapterHandler;
