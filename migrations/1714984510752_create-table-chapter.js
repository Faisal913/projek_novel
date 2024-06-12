/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // Buat sequence untuk id_chapter
  pgm.createSequence('chapter_id_seq');

  // Buat tabel chapter dengan id_chapter sebagai auto-increment
  pgm.createTable('chapter', {
    id_chapter: {
      type: 'INTEGER',
      primaryKey: true,
      default: pgm.func("nextval('chapter_id_seq')")
    },
    no_chapter: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    tgl_chapter: {
      type: 'DATE',
      notNull: true,
    },
    isi_chapter: {
      type: 'TEXT',
      notNull: true,
    },
    id_admin: {
      type: 'INTEGER',
      notNull: true,
    },
    id_novel: {
      type: 'INTEGER',
      notNull: false,
    },
  });

  // Tambahkan foreign key constraint pada id_admin
  pgm.addConstraint('chapter', 'fk_chapter.id_admin_admin.id', 'FOREIGN KEY(id_admin) REFERENCES admin(id_admin) ON DELETE CASCADE');

  // Tambahkan foreign key constraint pada id_novel
  pgm.addConstraint('chapter', 'fk_chapter.id_novel_novel.id', 'FOREIGN KEY(id_novel) REFERENCES novel(id_novel) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('chapter');
  pgm.dropSequence('chapter_id_seq');
};