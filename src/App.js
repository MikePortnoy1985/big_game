import React from 'react'
import { HomePage } from './routes/home'
import { GamePage } from './routes/game'

export const App = props => {
   const [page, setPage] = React.useState('app')
   const handleChangePage = page => {
      setPage(page)
   }
   switch (page) {
      case 'app':
         return <HomePage handleChangePage={handleChangePage} />
      case 'game':
         return <GamePage handleChangePage={handleChangePage} />
      default:
         return <HomePage />
   }
}
