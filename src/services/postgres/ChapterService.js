const { Pool } = require('pg');
const InvariantError = require('../../expceptions/InvariantError');
const NotFoundError = require('../../expceptions/NotFoundError');

class ChapterService {
  constructor() {
    this._pool = new Pool();
  }

  async addChapter({ no_chapter, tgl_chapter, isi_chapter, id_admin, id_novel }) {
    const query = {
      text: 'INSERT INTO chapter (no_chapter, tgl_chapter, isi_chapter, id_admin, id_novel) VALUES($1, $2, $3, $4, $5) RETURNING id_chapter',
      values: [no_chapter, tgl_chapter, isi_chapter, id_admin, id_novel],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new InvariantError('Chapter gagal ditambahkan');
      }

      return result.rows[0].id_chapter;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getChapters() {
    const query = {
      text: 'SELECT * FROM chapter',
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

  async getChapterById(id) {
    const query = {
      text: 'SELECT * FROM chapter WHERE id_chapter = $1',
      values: [id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Chapter tidak ditemukan');
      }

      return result.rows[0];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async editChapterById(id, { no_chapter, tgl_chapter, isi_chapter, id_admin, id_novel }) {
    const query = {
      text: 'UPDATE chapter SET no_chapter = $1, tgl_chapter = $2, isi_chapter = $3, id_admin = $4, id_novel = $5 WHERE id_chapter = $6 RETURNING id_chapter',
      values: [no_chapter, tgl_chapter, isi_chapter, id_admin, id_novel, id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Gagal memperbarui chapter. Id tidak ditemukan');
      }

      return result.rows[0].id_chapter;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async deleteChapterById(id) {
    const query = {
      text: 'DELETE FROM chapter WHERE id_chapter = $1 RETURNING id_chapter',
      values: [id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Chapter gagal dihapus. Id tidak ditemukan');
      }

      return result.rows[0].id_chapter;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}

module.exports = ChapterService;
