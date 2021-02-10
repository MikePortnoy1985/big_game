import React from 'react'
import { PokemonCard } from '../../../../components/pokemonCard/PokemonCard'
import s from './Style.module.css'
import { FirebaseContext } from '../../../../context/FirebaseContext'
import { PokemonContext } from '../../../../context/PokemonContext'
import { useHistory } from 'react-router-dom'

export const StartPage = () => {
   const [pokemons, setPokemons] = React.useState({})
   const firebase = React.useContext(FirebaseContext)
   const gameContext = React.useContext(PokemonContext)
   const history = useHistory()

   const getPokemons = async () => {
      firebase.ref('pokemons').on('value', snapshot => {
         setPokemons(snapshot.val())
      })
   }

   const postPokemon = (key, poke) => {
      firebase.ref(`pokemons/${key}`).set(poke)
   }

   const addPokemon = data => {
      const newKey = firebase.ref('pokemons').push().key
      firebase.ref(`pokemons/${newKey}`).set(data)
   }

   const addToContext = pokemon => {
      gameContext.pokemons.push(pokemon)
   }

   const handleSelected = id => {
      setPokemons(prevState =>
         Object.entries(prevState).reduce((acc, item) => {
            const pokemon = { ...item[1] }
            if (pokemon.id === id) {
               pokemon.isSelected = true
               addToContext(pokemon)
            }
            acc[item[0]] = pokemon
            return acc
         }, {}),
      )
   }

   React.useEffect(() => {
      getPokemons()
   }, [])

   return (
      <>
         <div className={s.flex}>
            <div className={s.buttonWrap}>
               <button className={s.button} onClick={addPokemon({})}>
                  Add pokemon
               </button>
            </div>
            {Object.entries(pokemons).map(([key, { name, img, active, id, type, values, isSelected }]) => {
               return (
                  <PokemonCard
                     key={key}
                     active={active}
                     name={name}
                     img={img}
                     id={id}
                     type={type}
                     minimize={false}
                     values={values}
                     isSelected={isSelected}
                     handleSelected={handleSelected}
                  />
               )
            })}
            <div className={s.buttonWrap}>
               <button className={s.button} onClick={() => history.push('/game/board')}>
                  Start game
               </button>
            </div>
         </div>
      </>
   )
}
