/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { PokemonCard } from '../../../../components/pokemonCard/PokemonCard'
import { useHistory } from 'react-router-dom'
import { PlayerBoard } from './playerBoard/PlayerBoard'
import { api } from '../../../../api/netlify'
import { handleCanRedirect } from '../../../../store/GamePageSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Results } from '../../../../utils/results/Results'
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
   const { playerSelectedPokemons, enemyPokemons } = useSelector(state => state.gamePage)
   const [board, setBoard] = React.useState([])
   const [firstPlayer, setFirstPlayer] = React.useState(() => {
      return Object.values(playerSelectedPokemons).map(poke => ({
         ...poke,
         possession: 'blue',
      }))
   })
   const [secondPlayer, setSecondPlayer] = React.useState(enemyPokemons)
   const [chooseCard, setChooseCard] = React.useState(null)
   const [step, setStep] = React.useState(0)
   const [type, setType] = React.useState(null)

   const dispatch = useDispatch()
   const history = useHistory()

   React.useEffect(() => {
      ;(async () => {
         const boardResponse = await api.getBoard()
         setBoard(boardResponse.data.data)
      })()
   }, [])

   if (Object.keys(playerSelectedPokemons).length === 0) {
      history.replace('/game')
   }

   const handleClickBoardPlate = async position => {
      if (chooseCard) {
         const params = {
            position,
            card: chooseCard,
            board,
         }

         const res = await api.handleBoardClick(params)

         if (chooseCard.player === 1) {
            setFirstPlayer(prevState => prevState.filter(item => item.id !== chooseCard.id))
         }
         if (chooseCard.player === 2) {
            setSecondPlayer(prevState => prevState.filter(item => item.id !== chooseCard.id))
         }

         setBoard(res.data.data)
         setStep(prevState => prevState + 1)
      }
   }

   React.useEffect(() => {
      let id
      if (step === 9) {
         const [count1, count2] = winCondition(board, firstPlayer, secondPlayer)

         if (count1 > count2) {
            setType('win')
         } else if (count1 < count2) {
            setType('lose')
         } else {
            setType('draw')
         }
         dispatch(handleCanRedirect(true))
         id = setTimeout(() => history.push('/game/finish'), 2000)
      }
      return () => clearTimeout(id)
   }, [step, board, firstPlayer, secondPlayer])

   return (
      <div className={s.root}>
         {type && <Results type={type} />}
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
