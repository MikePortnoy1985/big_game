import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { StartPage } from './routes/start/StartPage'
import { Board } from './routes/board/Board'
import { Finish } from './routes/finish/Finish'
import { PokemonContext } from '../../context/PokemonContext'

export const GamePage = () => {
   const match = useRouteMatch()
   const [pokemons, setPokemons] = React.useState([])
   return (
      <PokemonContext.Provider value={{ pokemons }}>
         <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={Board} />
            <Route path={`${match.path}/finish`} component={Finish} />
         </Switch>
      </PokemonContext.Provider>
   )
}
