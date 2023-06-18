const { db } = require('./Firebase')

class Database {
  constructor(collection) {
    this.collection = collection
  }

  async index() {
    return await db.collection(this.collection).get()
  }

  async findById(id) {
    try {
      const result = await db.collection(this.collection).doc(id).get()
      const user = result.data()
      if (user !== undefined) {
        return result.data()
      } else {
        throw new Error('Not found')
      }
    } catch (error) {
      throw error
    }
  }

  async find(id) {
    return await db.collection(this.collection).doc(id).get()
  }

  async add(data) {
    const { uid = null } = data
    try {
      let docRef
      if (uid) {
        docRef = db.collection(this.collection).doc(uid)
      } else {
        docRef = db.collection(this.collection).doc()
      }
      const document = await docRef.set({
        ...data,
        dateCreated: new Date(),
      })
      return document
    } catch (error) {
      throw `Error on the DB ${error}`
    }
  }

  async update({ id, data }) {
    try {
      const docRef = db.collection(this.collection).doc(id)

      const user = await docRef.set(
        {
          ...data,
          dateCreated: new Date(),
        },
        { merge: true }
      )
      return user
    } catch (error) {
      throw `Error on the DB ${error}`
    }
  }
}

module.exports = Database
