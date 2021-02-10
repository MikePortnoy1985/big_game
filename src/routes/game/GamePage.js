import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { StartPage } from './routes/start/StartPage'
import { Board } from './routes/board/Board'
import { Finish } from './routes/finish/Finish'
import { PokemonContext } from '../../context/PokemonContext'

export const GamePage = () => {
   const match = useRouteMatch()
   const [selectedPokemons, setSelectedPokemons] = React.useState({})

   const handleSelectedPokemons = (key, pokemon) => {
      setSelectedPokemons(prevState => {
         if (prevState[key]) {
            const copyState = { ...prevState }
            delete copyState[key]

            return copyState
         }
         return {
            ...prevState,
            [key]: pokemon,
         }
      })
   }
   return (
      <PokemonContext.Provider
         value={{
            pokemons: selectedPokemons,
            handleSelectedPokemons: handleSelectedPokemons,
         }}>
         <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={Board} />
            <Route path={`${match.path}/finish`} component={Finish} />
         </Switch>
      </PokemonContext.Provider>
   )
}
