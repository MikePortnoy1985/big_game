import React from 'react'
import { PokemonCard } from '../../../../components/pokemonCard/PokemonCard'
import { PokemonContext } from '../../../../context/PokemonContext.js'
import s from './Style.module.css'

export const Board = () => {
   const gameContext = React.useContext(PokemonContext)

   return (
      <div className={s.root}>
         <div className={s.playerOne}>
            {gameContext.pokemon.map(({ name, img, active, id, type, values, isSelected }) => {
               return (
                  <PokemonCard
                     key={id}
                     active={active}
                     name={name}
                     img={img}
                     id={id}
                     type={type}
                     minimize={true}
                     values={values}
                     className={s.card}
                     isSelected={isSelected}
                  />
               )
            })}
         </div>
         <div className={s.board}>
            <div className={s.boardPlate}>1</div>
            <div className={s.boardPlate}>2</div>
            <div className={s.boardPlate}>3</div>
            <div className={s.boardPlate}>4</div>
            <div className={s.boardPlate}>5</div>
            <div className={s.boardPlate}>6</div>
            <div className={s.boardPlate}>7</div>
            <div className={s.boardPlate}>8</div>
            <div className={s.boardPlate}>9</div>
         </div>
      </div>
   )
}
