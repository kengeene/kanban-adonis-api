const { db } = require('./Firebase')

export default class Database {
  public collection: any
  constructor(collection: String) {
    this.collection = collection
  }

  public async index() {
    return new Promise((resolve, reject) => {
      db.collection(this.collection)
        .get()
        .then((querySnapshot) => {
          let records: any = []
          querySnapshot.forEach((snapshot) => {
            let record = snapshot.data()
            records.push(record)
          })

          resolve(records)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public async findById(id) {
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

  public async find(id) {
    return await db.collection(this.collection).doc(id).get()
  }

  public async add(data) {
    const { id = null } = data
    console.log('id', id)
    try {
      let docRef
      if (id) {
        docRef = db.collection(this.collection).doc(id)
      } else {
        docRef = db.collection(this.collection).doc()
      }
      await docRef.set({
        ...data,
        dateCreated: new Date(),
      })
      return docRef.id
    } catch (error) {
      throw `Error on the DB ${error}`
    }
  }

  public async update({ id, data }) {
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

// module.exports = Database
