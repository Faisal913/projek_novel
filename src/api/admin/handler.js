const ClientError = require('../../expceptions/ClientError');

class AdminHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAdminHandler = this.postAdminHandler.bind(this);
    this.getAdminByIdHandler = this.getAdminByIdHandler.bind(this);
    this.putAdminByIdHandler = this.putAdminByIdHandler.bind(this);
    this.deleteAdminByIdHandler = this.deleteAdminByIdHandler.bind(this);
  }

  async postAdminHandler(request, h) {
    try {
      this._validator.validateAdminPayload(request.payload);
      const { username, password, name_admin } = request.payload;

      const adminId = await this._service.addAdmin({ username, password, name_admin });

      const response = h.response({
        status: 'success',
        message: 'Admin berhasil ditambahkan',
        data: {
          adminId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async getAdminByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const admin = await this._service.getAdminById(id);

      return {
        status: 'success',
        data: {
          admin,
        },
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async putAdminByIdHandler(request, h) {
    try {
      this._validator.validateAdminPayload(request.payload);
      const { id } = request.params;
      await this._service.editAdminById(id, request.payload);
      return {
        status: 'success',
        message: 'Admin berhasil diperbarui',
      };
    } catch (error) {
      return this._handleError(error, h);
    }
  }

  async deleteAdminByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteAdminById(id);
      return {
        status: 'success',
        message: 'Admin berhasil dihapus',
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

module.exports = AdminHandler;
