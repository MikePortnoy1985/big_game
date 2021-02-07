import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { PokemonCard } from '../../components/pokemonCard/PokemonCard'
import s from '../home/Style.module.css'
import { database } from '../../api/firebase'
import * as React from 'react'

export const GamePage = () => {
   const history = useHistory()
   const handleClick = () => {
      history.push('/')
   }

   const [pokemons, setPokemons] = React.useState({})

   const handleActive = id => {
      setPokemons(prevState =>
         Object.entries(prevState).reduce((acc, item) => {
            const pokemon = { ...item[1] }
            if (pokemon.id === id) {
               pokemon.active = !pokemon.active
               const key = database.ref().child('pokemons').key
               console.log(key)
               database.ref(`pokemons/${item[0]}`).update({
                  ...pokemon,
               })
            }

            acc[item[0]] = pokemon

            return acc
         }, {}),
      )
   }

   React.useEffect(() => {
      database.ref('pokemons').on('value', data => {
         setPokemons(data.val())
      })
   }, [])

   const addPokemon = () => {
      const newKey = database.ref('pokemons').push().key
      database.ref(`pokemons/${newKey}`).set({
         abilities: ['keen-eye', 'tangled-feet', 'big-pecks'],
         base_experience: 122,
         height: 11,
         id: 17,
         img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png',
         name: 'pidgeotto',
         stats: {
            attack: 60,
            defense: 55,
            hp: 63,
            'special-attack': 50,
            'special-defense': 50,
            speed: 71,
         },
         type: 'flying',
         values: {
            bottom: 7,
            left: 5,
            right: 2,
            top: 'A',
         },
      })
   }

   return (
      <>
         <button onClick={handleClick}>Return to home page</button>
         <div className={s.flex}>
            <button style={{ alignSelf: 'center' }} onClick={addPokemon}>
               Add pokemon
            </button>
            {Object.entries(pokemons).map(([key, { name, img, active, id, type, values }]) => {
               return (
                  <PokemonCard
                     key={id}
                     active={active}
                     name={name}
                     img={img}
                     id={id}
                     type={type}
                     values={values}
                     handleActive={handleActive}
                  />
               )
            })}
         </div>
      </>
   )
}

GamePage.propTypes = {
   handleChangePage: PropTypes.func.isRequired,
}
