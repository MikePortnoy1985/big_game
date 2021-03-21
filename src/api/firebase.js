import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()

export const firebaseApi = {
   registration: async (email, password) => {
      const requestOptions = {
         method: 'POST',
         body: JSON.stringify({
            email,
            password,
            returnToken: true,
         }),
      }
      const response = await fetch(
         `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
         requestOptions,
      )

      return response.json()
   },
   signIn: async (email, password) => {
      const requestOptions = {
         method: 'POST',
         body: JSON.stringify({
            email,
            password,
            returnToken: true,
         }),
      }
      const response = await fetch(
         `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
         requestOptions,
      )

      return response.json()
   },
   addStartPokemons: async (id, pokemon, token) => {
      const requestOptions = {
         method: 'POST',
         body: JSON.stringify(pokemon),
      }
      await fetch(
         `https://big-game-558c7-default-rtdb.firebaseio.com/${id}/pokemons.json?auth=${token}`,
         requestOptions,
      )
   },
   getUser: async idToken => {
      const requestOptions = {
         method: 'POST',
         body: JSON.stringify({
            idToken,
         }),
      }
      const response = await fetch(
         `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
         requestOptions,
      )
      return response.json()
   },
   getPokemons: async id => {
      const response = await fetch(`https://big-game-558c7-default-rtdb.firebaseio.com/${id}/pokemons.json`)
      return response.json()
   },
   putPokemonToCollection: async (id, pokemon) => {
      const requestOptions = {
         method: 'POST',
         body: JSON.stringify(pokemon),
      }
      const response = await fetch(
         `https://big-game-558c7-default-rtdb.firebaseio.com/${id}/pokemons/.json`,
         requestOptions,
      )
      return response.json()
   },
}
