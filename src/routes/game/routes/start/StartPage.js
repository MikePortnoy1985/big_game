import React from 'react'
import { PokemonCard } from '../../../../components/pokemonCard/PokemonCard'
import { FirebaseContext } from '../../../../context/FirebaseContext'
import { PokemonContext } from '../../../../context/PokemonContext'
import { useHistory } from 'react-router-dom'
import s from './Style.module.css'

export const StartPage = () => {
   const [pokemons, setPokemons] = React.useState({})
   const firebase = React.useContext(FirebaseContext)
   const gameContext = React.useContext(PokemonContext)
   const history = useHistory()

   const addPokemon = data => {
      const newKey = firebase.ref('pokemons').push().key
      firebase.ref(`pokemons/${newKey}`).set(data)
   }

   const handleSelected = key => {
      const pokemon = { ...pokemons[key] }
      gameContext.handleSelectedPokemons(key, pokemon)
      setPokemons(prevState => ({
         ...prevState,
         [key]: {
            ...prevState[key],
            isSelected: prevState[key].isSelected ? !prevState[key].isSelected : true,
         },
      }))
   }

   React.useEffect(() => {
      (async () => {
         await firebase.ref('pokemons').on('value', snapshot => {
            setPokemons(snapshot.val())
         })
      })()
   }, [firebase])

   return (
      <>
         <div className={s.flex}>
            {Object.entries(pokemons).map(([key, { name, img, active, id, type, values, isSelected }]) => {
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
                        if (Object.keys(gameContext.pokemons).length < 5 || isSelected) {
                           handleSelected(key)
                        }
                     }}
                  />
               )
            })}
            <div className={s.buttonWrap}>
               <button
                  className={s.button}
                  disabled={Object.keys(gameContext.pokemons).length < 5}
                  onClick={() => history.push('/game/board')}>
                  {Object.keys(gameContext.pokemons).length < 5 ? 'Choose 5 pokemons' : 'Start game'}
               </button>
            </div>
         </div>
      </>
   )
}
