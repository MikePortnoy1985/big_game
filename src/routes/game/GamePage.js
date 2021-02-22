import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { StartPage } from './routes/start/StartPage'
import { Board } from './routes/board/Board'
import { Finish } from './routes/finish/Finish'
import { useSelector } from 'react-redux'

export const GamePage = () => {
   const match = useRouteMatch()
   const { canRedirect } = useSelector(state => state.gamePage)
   return (
      <Switch>
         <Route path={`${match.path}/`} exact component={StartPage} />
         <Route path={`${match.path}/board`} component={Board} />
         {canRedirect && <Route path={`${match.path}/finish`} component={Finish} />}
      </Switch>
   )
}
