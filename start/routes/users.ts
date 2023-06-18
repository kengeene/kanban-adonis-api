import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/', 'UsersController.index')
  Route.get('/:id', 'UsersController.get')
  Route.post('/', 'UsersController.create')
  Route.put('/:id', 'UsersController.update')
}).prefix('users')
