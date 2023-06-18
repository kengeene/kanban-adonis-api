import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from 'App/Repository/Firestore'

const usersCollection = new Database('users')
export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      // Retrieve all users from the Firebase database
      const users = await usersCollection.index()

      return response.json(users)
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while retrieving users.' })
    }
  }

  public async create({ response, request }: HttpContextContract) {
    try {
      // Get the task data from the request body
      const userData = request.only(['email', 'fullName', 'id', 'avatar'])

      // Create a new task record in the Firebase database
      const user = await usersCollection.add(userData)

      return response.status(201).json({ message: 'Successfully created user', data: user })
      // .json({ message: 'Task created successfully.', taskId: taskRef.id })
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while creating the task.' })
    }
  }

  public async get({ response, request }: HttpContextContract) {
    try {
      const { id } = request.params()
      // Retrieve a user from the Firebase database by email
      const userDoc = await usersCollection.findById(id)
      const user = userDoc.data()

      if (!user) {
        return response.status(404).json({ message: 'User not found.' })
      }

      return response.json(user)
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while retrieving the user.' })
    }
  }
}
