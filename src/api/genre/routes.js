const routes = (handler) => [
    {
      method: 'POST',
      path: '/genre',
      handler: handler.postGenreHandler,
    },
    {
      method: 'GET',
      path: '/genre',
      handler: handler.getGenresHandler,
    },
    {
      method: 'GET',
      path: '/genre/{id}',
      handler: handler.getGenreByIdHandler,
    },
    {
      method: 'PUT',
      path: '/genre/{id}',
      handler: handler.putGenreByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/genre/{id}',
      handler: handler.deleteGenreByIdHandler,
    },
  ];
  
module.exports = routes;  