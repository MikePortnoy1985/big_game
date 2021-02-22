import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { database as firebase } from '../api/firebase'
import { api } from '../api/netlify'

export const getPokemons = createAsyncThunk('gamePage/getPokemons', (_, thunkApi) => {
   try {
      return new Promise((res, rej) =>
         firebase.ref('pokemons').on('value', snapshot => {
            if (snapshot.exists()) {
               const response = snapshot.val()
               res(response)
            } else {
               throw new Error('Some error occured')
            }
         }),
      )
   } catch (e) {
      return thunkApi.rejectWithValue(e)
   }
})

export const getEnemyPokemons = createAsyncThunk(`board/getEnemyPokemons`, async (_, thunkApi) => {
   try {
      const response = await api.getEnemyPokemons()
      return response.data.data
   } catch (e) {
      return thunkApi.rejectWithValue(e.message)
   }
})

export const putPokeToCoolection = createAsyncThunk(`finish/putPokeToCoolection`, async ({ id }, thunkApi) => {
   try {
      const state = thunkApi.getState().gamePage
      const poke = state.enemyPokemons.find(item => item.id === id)
      const newKey = firebase.ref('pokemons').push().key
      await firebase.ref(`pokemons/${newKey}`).set(poke)
      return
   } catch (e) {
      return thunkApi.rejectWithValue(e.message)
   }
})

export const gamePageSlice = createSlice({
   name: 'gamePage',
   initialState: {
      playerPokemons: {},
      playerSelectedPokemons: {},
      enemyPokemons: [],
      canRedirect: false,
      loading: false,
   },
   reducers: {
      selectPokemon: (state, action) => {
         if (state.playerSelectedPokemons[action.payload.key]) {
            delete state.playerSelectedPokemons[action.payload.key]
         } else {
            state.playerSelectedPokemons[action.payload.key] = action.payload.pokemon
         }
         state.playerPokemons[action.payload.key].isSelected = state.playerPokemons[action.payload.key].isSelected
            ? !state.playerPokemons[action.payload.key].isSelected
            : true
      },
      handleCanRedirect: (state, action) => {
         state.canRedirect = action.payload
      },
      restoreState: state => {
         state.playerPokemons = {}
         state.playerSelectedPokemons = {}
         state.enemyPokemons = []
         state.canRedirect = false
      },
   },
   extraReducers: {
      [getPokemons.pending]: state => {
         state.loading = true
      },
      [getPokemons.fulfilled]: (state, action) => {
         state.playerPokemons = action.payload
         state.loading = false
      },
      [getPokemons.rejected]: (state, action) => {
         state.error = action.payload
         state.loading = false
      },
      [getEnemyPokemons.pending]: state => {
         state.loading = true
      },
      [getEnemyPokemons.fulfilled]: (state, action) => {
         state.enemyPokemons = action.payload.map(poke => ({
            ...poke,
            possession: 'red',
         }))
         state.loading = false
      },
      [getEnemyPokemons.rejected]: (state, action) => {
         state.error = action.payload
         state.loading = false
      },
   },
})

export const { selectPokemon, handleCanRedirect, restoreState } = gamePageSlice.actions
