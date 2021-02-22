import React from 'react'
import { PokemonCard } from '../../../../components/pokemonCard/PokemonCard'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, getEnemyPokemons, selectPokemon } from '../../../../store/GamePageSlice'
import { Loader } from '../../../../utils/loader/Loader'
import s from './Style.module.css'

export const StartPage = () => {
   const { playerPokemons, playerSelectedPokemons, loading } = useSelector(state => state.gamePage)
   const dispatch = useDispatch()
   const history = useHistory()

   const handleSelected = key => {
      const pokemon = { ...playerPokemons[key] }
      dispatch(selectPokemon({ key, pokemon }))
   }

   React.useEffect(() => {
      dispatch(getPokemons())
      dispatch(getEnemyPokemons())
   }, [dispatch])

   return (
      <>
         <div className={s.flex}>
            {loading ? (
               <Loader />
            ) : (
               <>
                  {Object.entries(playerPokemons).map(([key, { name, img, active, id, type, values, isSelected }]) => {
                     return (
                        <PokemonCard
                           className={s.card}
                           isSelected={isSelected}
                           key={key}
                           active={active}
                           name={name}
                           img={img}
                           id={id}
                           type={type}
                           minimize={false}
                           values={values}
                           handleSelected={() => {
                              if (Object.keys(playerSelectedPokemons).length < 5 || isSelected) {
                                 handleSelected(key)
                              }
                           }}
                        />
                     )
                  })}
                  <div className={s.buttonWrap}>
                     <button
                        className={s.button}
                        disabled={Object.keys(playerSelectedPokemons).length < 5}
                        onClick={() => history.push('/game/board')}>
                        {Object.keys(playerSelectedPokemons).length < 5 ? 'Choose 5 pokemons' : 'Start game'}
                     </button>
                  </div>
               </>
            )}
         </div>
      </>
   )
}
