const { Pool } = require('pg');
const InvariantError = require('../../expceptions/InvariantError');
const NotFoundError = require('../../expceptions/NotFoundError');
const bcrypt = require('bcrypt');

class AdminService {
  constructor() {
    this._pool = new Pool();
  }

  async addAdmin({ username, password, name_admin }) {
    await this.verifyNewUsername(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO admin (username, password, name_admin) VALUES($1, $2, $3) RETURNING id_admin',
      values: [username, hashedPassword, name_admin],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);
      
      if (!result.rows.length) {
        throw new InvariantError('Admin gagal ditambahkan');
      }

      return result.rows[0].id_admin;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getAdminById(id) {
    const query = {
      text: 'SELECT id_admin, username, name_admin FROM admin WHERE id_admin = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Admin tidak ditemukan');
    }

    return result.rows[0];
  }

  async editAdminById(id, { username, password, name_admin }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'UPDATE admin SET username = $1, password = $2, name_admin = $3 WHERE id_admin = $4 RETURNING id_admin',
      values: [username, hashedPassword, name_admin, id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Gagal memperbarui admin. Id tidak ditemukan');
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async deleteAdminById(id) {
    const query = {
      text: 'DELETE FROM admin WHERE id_admin = $1 RETURNING id_admin',
      values: [id],
    };

    try {
      console.log('Executing query:', query);
      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Admin gagal dihapus. Id tidak ditemukan');
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM admin WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan admin. Username sudah digunakan.');
    }
  }

  async verifyAdminCredential(username, password) {
    const query = {
      text: 'SELECT id_admin, password FROM admin WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Admin tidak ditemukan');
    }

    const { id_admin, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new InvariantError('Kredensial yang Anda berikan salah');
    }

    return id_admin;
  }
}

module.exports = AdminService;
