const routes = (handler) => [
    {
      method: 'POST',
      path: '/chapter',
      handler: handler.postChapterHandler,
    },
    {
      method: 'GET',
      path: '/chapter/{id}',
      handler: handler.getChapterByIdHandler,
    },
    {
      method: 'GET',
      path: '/chapter',
      handler: handler.getChaptersHandler,
    },
    {
      method: 'PUT',
      path: '/chapter/{id}',
      handler: handler.putChapterByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/chapter/{id}',
      handler: handler.deleteChapterByIdHandler,
    },
  ];
  
module.exports = routes;