const routes = (handler) => [
  {
    method: 'POST',
    path: '/admin',
    handler: handler.postAdminHandler,
  },
  {
    method: 'GET',
    path: '/admin/{id}',
    handler: handler.getAdminByIdHandler,
  },
  {
    method: 'PUT',
    path: '/admin/{id}',
    handler: handler.putAdminByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/admin/{id}',
    handler: handler.deleteAdminByIdHandler,
  },
];

module.exports = routes;
