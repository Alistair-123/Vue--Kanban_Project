import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDTV1JVQLZAoKTulD7XXfWrQGrFF5hJS6M',
  authDomain: 'vue-project-3b334.firebaseapp.com',
  projectId: 'vue-project-3b334',
  storageBucket: 'vue-project-3b334.firebasestorage.app',
  messagingSenderId: '699515228008',
  appId: '1:699515228008:web:dd7f799b7ce6438d7190dd',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
