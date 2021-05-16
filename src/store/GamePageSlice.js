import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseApi } from '../api/firebase'
import { api } from '../api/netlify'

export const getPokemons = createAsyncThunk('gamePage/getPokemons', async (_, thunkApi) => {
   try {
      const { user } = thunkApi.getState()
      const response = await firebaseApi.getPokemons(user.id)
      if (response.hasOwnProperty('error')) {
         throw new Error(response.error)
      }
      return response
   } catch (e) {
      return thunkApi.rejectWithValue(e.message)
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
      const { gamePage, user } = thunkApi.getState()
      const poke = gamePage.enemyPokemons.find(item => item.id === id)

      await firebaseApi.putPokemonToCollection(user.id, poke)
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
