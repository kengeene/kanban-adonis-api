// Import the functions you need from the SDKs you need
const firebase = require('firebase/compat/app')
require('firebase/compat/auth')
require('firebase/compat/firestore')
const admin = require('firebase-admin')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG!)

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const auth = admin.auth()
const db = firebase.firestore()

module.exports = { db, auth }
