/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { PokemonCard } from '../../../../components/pokemonCard/PokemonCard'
import { PokemonContext } from '../../../../context/PokemonContext.js'
import { useHistory } from 'react-router-dom'
import { PlayerBoard } from './playerBoard/PlayerBoard'
import s from './Style.module.css'

const winCondition = (board, player1, player2) => {
   let player1Count = player1.length
   let player2Count = player2.length

   board.forEach(item => {
      if (item.card.possession === 'red') {
         player2Count++
      }
      if (item.card.possession === 'blue') {
         player1Count++
      }
   })
   return [player1Count, player2Count]
}

export const Board = () => {
   const gameContext = React.useContext(PokemonContext)
   const [board, setBoard] = React.useState([])
   const [firstPlayer, setFirstPlayer] = React.useState(() => {
      return Object.values(gameContext.pokemons).map(poke => ({
         ...poke,
         possession: 'blue',
      }))
   })
   const [secondPlayer, setSecondPlayer] = React.useState([])
   const [chooseCard, setChooseCard] = React.useState(null)
   const [step, setStep] = React.useState(0)

   const history = useHistory()

   React.useEffect(() => {
      ;(async () => {
         const boardResponse = await fetch(`https://reactmarathon-api.netlify.app/api/board`)
         const boardRequest = await boardResponse.json()
         setBoard(boardRequest.data)
         const secondPlayerResponse = await fetch(`https://reactmarathon-api.netlify.app/api/create-player`)
         const secondPlayerRequest = await secondPlayerResponse.json()
         gameContext.handleEnemyPokemons(secondPlayerRequest.data)
         setSecondPlayer(() => {
            return secondPlayerRequest.data.map(poke => ({
               ...poke,
               possession: 'red',
            }))
         })
      })()
   }, [])

   if (Object.keys(gameContext.pokemons).length === 0) {
      history.replace('/game')
   }

   const handleClickBoardPlate = async position => {
      if (chooseCard) {
         const params = {
            position,
            card: chooseCard,
            board,
         }

         const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
         })

         const request = await res.json()

         if (chooseCard.player === 1) {
            setFirstPlayer(prevState => prevState.filter(item => item.id !== chooseCard.id))
         }
         if (chooseCard.player === 2) {
            setSecondPlayer(prevState => prevState.filter(item => item.id !== chooseCard.id))
         }

         setBoard(request.data)
         setStep(prevState => prevState + 1)
      }
   }

   React.useEffect(() => {
      let id
      if (step === 9) {
         const [count1, count2] = winCondition(board, firstPlayer, secondPlayer)

         if (count1 > count2) {
            alert('WIN')
         } else if (count1 < count2) {
            alert('LOOSE')
         } else {
            alert('DRAW')
         }
         gameContext.handleCanRedirect(true)
         id = setTimeout(() => history.push('/game/finish'), 2000)
      }
      return () => clearTimeout(id)
   }, [step, board, firstPlayer, secondPlayer])

   return (
      <div className={s.root}>
         <div className={s.playerOne}>
            <PlayerBoard player={1} cards={firstPlayer} onClickCard={card => setChooseCard(card)} />
         </div>
         <div className={s.board}>
            {board.map(item => (
               <div
                  key={item.position}
                  className={s.boardPlate}
                  onClick={() => !item.card && handleClickBoardPlate(item.position)}>
                  {item.card && <PokemonCard {...item.card} minimize />}
               </div>
            ))}
         </div>
         <div className={s.playerTwo}>
            <PlayerBoard player={2} cards={secondPlayer} onClickCard={card => setChooseCard(card)} />
         </div>
      </div>
   )
}
