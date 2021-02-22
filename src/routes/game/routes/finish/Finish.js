import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { PokemonCard } from '../../../../components/pokemonCard/PokemonCard.js'
import { useSelector, useDispatch } from 'react-redux'
import { putPokeToCoolection, restoreState } from '../../../../store/GamePageSlice'
import s from './Style.module.css'

export const Finish = () => {
   const history = useHistory()
   const { playerSelectedPokemons, enemyPokemons } = useSelector(state => state.gamePage)
   const [selected, setSelected] = React.useState()
   const [onlyOnePokemon, setOnlyOnePokemon] = React.useState(true)
   const dispatch = useDispatch()

   const addPokeTocollection = id => {
      if (onlyOnePokemon) {
         setSelected(id)
         dispatch(putPokeToCoolection({ id }))
         setOnlyOnePokemon(false)
      }
   }

   const endGameHandler = () => {
      dispatch(restoreState())
      history.push('/game')
   }

   if (enemyPokemons.length === 0) {
      dispatch(restoreState())
      return <Redirect to={'/game'} />
   }

   return (
      <div className={s.flex}>
         <div className={s.cardWrapper}>
            {Object.values(playerSelectedPokemons).map(item => {
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
            {enemyPokemons.map(item => {
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
