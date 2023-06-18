import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from 'App/Database/Firestore'

const tasksCollection = new Database('tasks')

export default class TasksController {
  public async index({ response }: HttpContextContract) {
    try {
      // Retrieve all tasks from the Firebase database
      const tasks = await tasksCollection.get()

      return response.json(tasks)
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while retrieving tasks.' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      // Get the task data from the request body
      const taskData = request.only(['title', 'description'])

      // Create a new task record in the Firebase database
      const taskRef = await tasksCollection.add(taskData)

      return response
        .status(201)
        .json({ message: 'Task created successfully.', taskId: taskRef.id })
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while creating the task.' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      // Retrieve a task from the Firebase database by task ID
      const taskDoc = await tasksCollection.doc(params.id).get()
      const task = taskDoc.data()

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
      const taskData = request.only(['title', 'description'])

      // Update the task record in the Firebase database
      await tasksCollection.doc(params.id).update(taskData)

      return response.json({ message: 'Task updated successfully.' })
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while updating the task.' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      // Delete the task record from the Firebase database
      await tasksCollection.doc(params.id).delete()

      return response.json({ message: 'Task deleted successfully.' })
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while deleting the task.' })
    }
  }
}
