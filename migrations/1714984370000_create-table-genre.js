/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Buat sequence untuk id_genre
  pgm.createSequence('genre_id_seq');

  // Buat tabel genre dengan id_genre sebagai auto-increment
  pgm.createTable('genre', {
    id_genre: {
      type: 'INTEGER',
      primaryKey: true,
      default: pgm.func("nextval('genre_id_seq')")
    },
    nama_genre: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    id_admin: {
      type: 'INTEGER',
      notNull: true,
    },
  });

  // Tambahkan foreign key constraint pada id_admin
  pgm.addConstraint('genre', 'fk_genre.id_admin_admin.id', 'FOREIGN KEY(id_admin) REFERENCES admin(id_admin) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('genre');
  pgm.dropSequence('genre_id_seq');
};
