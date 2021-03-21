import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseApi } from '../api/firebase'
import { NotificationManager } from 'react-notifications'

export const getUser = createAsyncThunk('user/getUser', async (_, thunkApi) => {
   try {
      const token = localStorage.getItem('BigGameIdToken')
      if (!token) {
         throw new Error('Authorization error. No token found')
      }
      const response = await firebaseApi.getUser(token)
      NotificationManager.success('Authorization success')
      if (response.error) {
         throw new Error(response.error.message)
      }
      return response.users[0]
   } catch (e) {
      NotificationManager.error(e.message, 'Authorization error')
      return thunkApi.rejectWithValue(e.message)
   }
})

export const UserSlice = createSlice({
   name: 'user',
   initialState: {
      data: {},
      id: null,
      loading: false,
   },
   reducers: {
      setId: (state, action) => {
         state.id = action.payload
      },
   },
   extraReducers: {
      [getUser.pending]: state => {
         state.loading = true
      },
      [getUser.fulfilled]: (state, action) => {
         state.data = action.payload
         state.id = action.payload.localId
         state.loading = false
      },
      [getUser.rejected]: (state, action) => {
         state.error = action.payload
         state.data = {}
         state.loading = false
         localStorage.removeItem('BigGameIdToken')
      },
   },
})

export const { setId } = UserSlice.actions
