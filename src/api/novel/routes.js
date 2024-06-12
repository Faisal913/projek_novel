const routes = (handler) => [
    {
      method: 'POST',
      path: '/novel',
      handler: handler.postNovelHandler,
    },
    {
      method: 'GET',
      path: '/novel',
      handler: handler.getNovelsHandler,
    },
    {
      method: 'GET',
      path: '/novel/{id}',
      handler: handler.getNovelByIdHandler,
    },
    {
      method: 'PUT',
      path: '/novel/{id}',
      handler: handler.putNovelByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/novel/{id}',
      handler: handler.deleteNovelByIdHandler,
    },
  ];
  
  module.exports = routes;
  