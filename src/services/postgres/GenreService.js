const { Pool } = require('pg');
const InvariantError = require('../../expceptions/InvariantError');
const NotFoundError = require('../../expceptions/NotFoundError');

class GenreService {
  constructor() {
    this._pool = new Pool();
  }

  async addGenre({ nama_genre, id_admin }) {
    const query = {
      text: 'INSERT INTO genre (nama_genre, id_admin) VALUES($1, $2) RETURNING id_genre',
      values: [nama_genre, id_admin],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new InvariantError('Genre gagal ditambahkan');
      }

      return result.rows[0].id_genre;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getGenreById(id) {
    const query = {
      text: 'SELECT id_genre, nama_genre, id_admin FROM genre WHERE id_genre = $1',
      values: [id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Genre tidak ditemukan');
      }

      return result.rows[0];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async editGenreById(id, { nama_genre, id_admin }) {
    const query = {
      text: 'UPDATE genre SET nama_genre = $1, id_admin = $2 WHERE id_genre = $3 RETURNING id_genre',
      values: [nama_genre, id_admin, id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Gagal memperbarui genre. Id tidak ditemukan');
      }

      return result.rows[0].id_genre;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async deleteGenreById(id) {
    const query = {
      text: 'DELETE FROM genre WHERE id_genre = $1 RETURNING id_genre',
      values: [id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Genre gagal dihapus. Id tidak ditemukan');
      }

      return result.rows[0].id_genre;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getGenres() {
    const query = {
      text: 'SELECT id_genre, nama_genre, id_admin FROM genre',
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      return result.rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}

module.exports = GenreService;
