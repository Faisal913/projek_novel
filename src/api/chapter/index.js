const ChapterHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'chapters',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const chapterHandler = new ChapterHandler(service, validator);
    server.route(routes(chapterHandler));
  },
};
