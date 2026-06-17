// src/firebase.ts
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDQD0KVH42454rBAq0bWC7cbbPlPhoJmaQ',
  authDomain: 'b-vyapari-website.firebaseapp.com',
  projectId: 'b-vyapari-website',
  storageBucket: 'b-vyapari-website.firebasestorage.app',
  messagingSenderId: '152719778865',
  appId: '1:152719778865:web:24d5f9cc6966908e6d6110'
}

export const firebaseApp = initializeApp(firebaseConfig)
