class FirestoreRepository {
  constructor(collection) {
    this.collection = collection
  }

  async create(payload) {
    try {
      await usersCollection.add(payload)
      return payload
    } catch (error) {
      return error
    }
  }

  async index(payload) {
    try {
      await usersCollection.add(payload)
      return payload
    } catch (error) {
      return error
    }
  }

  async get(id) {
    try {
      const user = await usersCollection.findById(id)
      return user
    } catch (error) {
      throw error
    }
  }

  async update(payload) {
    try {
      await usersCollection.update({ id, data: payload })
      return payload
    } catch (error) {
      return error
    }
  }
}
