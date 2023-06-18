import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from 'App/Repository/Firestore'

const tasksCollection = new Database('tasks')

export default class TasksController {
  public async index({ response }: HttpContextContract) {
    try {
      // Retrieve all tasks from the Firebase database
      const tasks = await tasksCollection.index()
      return response.json(tasks)
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while retrieving tasks.' })
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      // Get the task data from the request body
      const taskData = request.only([
        'title',
        'taskType',
        'id',
        'taskStatus',
        'userId',
        'userAvatar',
        'userFullName',
      ])

      // Create a new task record in the Firebase database
      const taskRef = await tasksCollection.add(taskData)

      return response
        .status(201)
        .json({ message: 'Task created successfully.', taskId: taskRef.id })
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while creating the task.' })
    }
  }

  public async get({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params()
      // Retrieve a task from the Firebase database by task ID
      const task = await tasksCollection.findById(id)

      if (!task) {
        return response.status(404).json({ message: 'Task not found.' })
      }

      return response.json(task)
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while retrieving the task.' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      // Get the updated task data from the request body
      const taskData = request.only([
        'title',
        'taskType',
        'id',
        'taskStatus',
        'userId',
        'userAvatar',
        'userFullName',
      ])

      // Update the task record in the Firebase database
      await tasksCollection.update({ id: params.id, data: taskData })

      return response.json({ message: 'Task updated successfully.' })
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while updating the task.' })
    }
  }
}
