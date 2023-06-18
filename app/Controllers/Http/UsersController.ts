import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from 'App/Database/Firestore'

const usersCollection = new Database('users')
export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      // Retrieve all users from the Firebase database
      const users = await usersCollection.get()

      return response.json(users)
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred while retrieving users.' })
    }
  }

  public async get({ response, request }: HttpContextContract) {
    try {
      const { id } = request.params()
      // Retrieve a user from the Firebase database by email
      const userDoc = await usersCollection.doc(id).get()
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
