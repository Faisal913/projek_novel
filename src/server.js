require('dotenv').config();

const Hapi = require('@hapi/hapi');

// Admin
const admin = require('./api/admin');
const AdminService = require('./services/postgres/AdminService');
const AdminValidator = require('./validator/admin');

// Novel
const novel = require('./api/novel');
const NovelService = require('./services/postgres/NovelService');
const NovelValidator = require('./validator/novel');

// Genre
const genre = require('./api/genre');
const GenreService = require('./services/postgres/GenreService');
const GenreValidator = require('./validator/genre');

// Chapter
const chapter = require('./api/chapter');
const ChapterService = require('./services/postgres/ChapterService');
const ChapterValidator = require('./validator/chapter');

const init = async () => {
  const adminService = new AdminService();
  const novelService = new NovelService();
  const genreService = new GenreService();
  const chapterService = new ChapterService();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: admin,
      options: {
        service: adminService,
        validator: AdminValidator,
      },
    },
    {
      plugin: novel,
      options: {
        service: novelService,
        validator: NovelValidator,
      },
    },
    {
      plugin: genre,
      options: {
        service: genreService,
        validator: GenreValidator,
      },
    },
    {
      plugin: chapter,
      options: {
        service: chapterService,
        validator: ChapterValidator,
      },
    },
  ]);

  // Tambahkan rute dasar untuk memastikan server berjalan
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return { message: 'Server is running' };
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init().catch((error) => {
  console.error('Failed to start the server:', error);
  process.exit(1);
});
