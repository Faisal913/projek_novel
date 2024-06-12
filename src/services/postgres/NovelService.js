const { Pool } = require('pg');
const InvariantError = require('../../expceptions/InvariantError');
const NotFoundError = require('../../expceptions/NotFoundError');

class NovelService {
  constructor() {
    this._pool = new Pool();
  }

  async addNovel({ judul_novel, deskripsi, pengarang, penerbit, tgl_rilis, img, id_admin, id_genre }) {
    const query = {
      text: 'INSERT INTO novel (judul_novel, deskripsi, pengarang, penerbit, tgl_rilis, img, id_admin, id_genre) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_novel',
      values: [judul_novel, deskripsi, pengarang, penerbit, tgl_rilis, img, id_admin, id_genre],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new InvariantError('Novel gagal ditambahkan');
      }

      return result.rows[0].id_novel;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getNovels() {
    const query = {
      text: 'SELECT * FROM novel',
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

  async getNovelById(id) {
    const query = {
      text: 'SELECT * FROM novel WHERE id_novel = $1',
      values: [id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Novel tidak ditemukan');
      }

      return result.rows[0];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async editNovelById(id, { judul_novel, deskripsi, pengarang, penerbit, tgl_rilis, img, id_genre }) {
    const query = {
      text: 'UPDATE novel SET judul_novel = $1, deskripsi = $2, pengarang = $3, penerbit = $4, tgl_rilis = $5, img = $6, id_genre = $7 WHERE id_novel = $8 RETURNING id_novel',
      values: [judul_novel, deskripsi, pengarang, penerbit, tgl_rilis, img, id_genre, id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Gagal memperbarui novel. Id tidak ditemukan');
      }

      return result.rows[0].id_novel;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async deleteNovelById(id) {
    const query = {
      text: 'DELETE FROM novel WHERE id_novel = $1 RETURNING id_novel',
      values: [id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Novel gagal dihapus. Id tidak ditemukan');
      }

      return result.rows[0].id_novel;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}

module.exports = NovelService;