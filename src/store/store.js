import { configureStore } from '@reduxjs/toolkit'
import { gamePageSlice } from './GamePageSlice'
import { UserSlice } from './UserSlice'

const reducer = {
   gamePage: gamePageSlice.reducer,
   user: UserSlice.reducer,
}

export const store = configureStore({
   reducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware(),
})
