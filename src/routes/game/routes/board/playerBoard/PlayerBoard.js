import React from 'react'
import cn from 'classnames'
import { PokemonCard } from '../../../../../components/pokemonCard/PokemonCard'
import s from './Style.module.css'

export const PlayerBoard = ({ player, cards, onClickCard }) => {
   const [isSelected, setSelected] = React.useState(null)
   return (
      <>
         {cards.map(card => {
            return (
               <div
                  className={cn(s.cardBoard, { [s.selected]: isSelected === card.id })}
                  key={card.id}
                  onClick={() => {
                     setSelected(card.id)
                     onClickCard &&
                        onClickCard({
                           ...card,
                           player,
                        })
                  }}>
                  <PokemonCard
                     key={card.id}
                     name={card.name}
                     img={card.img}
                     id={card.id}
                     type={card.type}
                     minimize
                     values={card.values}
                     active
                  />
               </div>
            )
         })}
      </>
   )
}
