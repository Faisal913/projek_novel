exports.shorthands = undefined;

exports.up = pgm => {
    // Buat sequence terlebih dahulu
    pgm.createSequence('admin_id_seq');
    
    // Gunakan sequence untuk id_admin
    pgm.createTable('admin', {
        id_admin: {
          type: 'INTEGER',
          primaryKey: true,
          default: pgm.func("nextval('admin_id_seq')")
        },
        username: {
          type: 'VARCHAR(50)',
          notNull: true,
          unique: true
        },
        password: {
          type: 'VARCHAR(255)',
          notNull: true,
        },
        name_admin: {
          type: 'VARCHAR(50)',
          notNull: true
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('admin');
    pgm.dropSequence('admin_id_seq');
};
