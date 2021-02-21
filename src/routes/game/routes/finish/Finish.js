import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { PokemonCard } from '../../../../components/pokemonCard/PokemonCard.js'
import { PokemonContext } from '../../../../context/PokemonContext.js'
import { FirebaseContext } from '../../../../context/FirebaseContext.js'
import s from './Style.module.css'

export const Finish = () => {
   const history = useHistory()
   const gameContext = React.useContext(PokemonContext)
   const firebase = React.useContext(FirebaseContext)
   const [selected, setSelected] = React.useState()
   const [onlyOnePokemon, setOnlyOnePokemon] = React.useState(true)

   const addPokeTocollection = id => {
      if (onlyOnePokemon) {
         setSelected(id)
         const poke = gameContext.enemyPokemons.find(item => item.id === id)
         const newKey = firebase.ref('pokemons').push().key
         firebase.ref(`pokemons/${newKey}`).set(poke)
         setOnlyOnePokemon(false)
      }
   }

   const endGameHandler = () => {
      gameContext.handleEnemyPokemons([])
      gameContext.handlePlayerPokemons({})
      gameContext.handleCanRedirect(false)
      history.push('/game')
   }

   if (gameContext.enemyPokemons.length === 0) {
      gameContext.handleEnemyPokemons([])
      gameContext.handlePlayerPokemons({})
      gameContext.handleCanRedirect(false)
      return <Redirect to={'/game'} />
   }

   return (
      <div className={s.flex}>
         <div className={s.cardWrapper}>
            {Object.values(gameContext.pokemons).map(item => {
               return (
                  <PokemonCard
                     key={item.id}
                     img={item.img}
                     id={item.id}
                     type={item.type}
                     name={item.name}
                     values={item.values}
                     className={s.card}
                  />
               )
            })}
         </div>
         <div className={s.buttonWrap}>
            <button className={s.button} onClick={() => endGameHandler()}>
               END GAME
            </button>
         </div>
         <div className={s.cardWrapper}>
            {gameContext.enemyPokemons.map(item => {
               return (
                  <PokemonCard
                     key={item.id}
                     img={item.img}
                     id={item.id}
                     type={item.type}
                     name={item.name}
                     values={item.values}
                     className={s.card}
                     isSelected={selected === item.id}
                     handleSelected={() => addPokeTocollection(item.id)}
                  />
               )
            })}
         </div>
      </div>
   )
}
