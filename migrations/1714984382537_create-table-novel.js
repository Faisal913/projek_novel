/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Buat sequence untuk id_novel
  pgm.createSequence('novel_id_seq');

  // Buat tabel novel dengan id_novel sebagai auto-increment
  pgm.createTable('novel', {
    id_novel: {
      type: 'INTEGER',
      primaryKey: true,
      default: pgm.func("nextval('novel_id_seq')")
    },
    judul_novel: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    deskripsi: {
      type: 'TEXT',
      notNull: true,
    },
    pengarang: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    penerbit: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    tgl_rilis: {
      type: 'DATE',
      notNull: false,
    },
    img: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    id_admin: {
      type: 'INTEGER',
      notNull: true,
    },
    id_genre: {
      type: 'INTEGER',
      notNull: false,
    },
  });

  // Tambahkan foreign key constraint pada id_admin
  pgm.addConstraint('novel', 'fk_novel.id_admin_admin.id', 'FOREIGN KEY(id_admin) REFERENCES admin(id_admin) ON DELETE CASCADE');

  // Tambahkan foreign key constraint pada id_genre
  pgm.addConstraint('novel', 'fk_novel.id_genre_genre.id', 'FOREIGN KEY(id_genre) REFERENCES genre(id_genre) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('novel');
  pgm.dropSequence('novel_id_seq');
};