import { configureStore } from '@reduxjs/toolkit'
import { gamePageSlice } from './GamePageSlice'

const reducer = {
   gamePage: gamePageSlice.reducer,
}

export const store = configureStore({
   reducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware(),
})
