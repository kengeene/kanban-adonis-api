import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.get('/statuses', 'TasksController.getStatuses')
  Route.get('/types', 'TasksController.getTypes')
  Route.get('/', 'TasksController.index')
  Route.get('/:id', 'TasksController.get')
  Route.post('/', 'TasksController.create')
  Route.put('/:id', 'TasksController.update')
}).prefix('tasks')
