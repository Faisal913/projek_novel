const GenreHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'genre',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const genreHandler = new GenreHandler(service, validator);
    server.route(routes(genreHandler));
  },
};
