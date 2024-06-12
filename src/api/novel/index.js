const NovelHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'novels',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const novelHandler = new NovelHandler(service, validator);
    server.route(routes(novelHandler));
  },
};
