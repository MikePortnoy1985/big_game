import React from 'react'
import { useRouteMatch, Switch } from 'react-router-dom'
import { StartPage } from './routes/start/StartPage'
import { Board } from './routes/board/Board'
import { Finish } from './routes/finish/Finish'
import { useSelector } from 'react-redux'
import { PrivateRoute } from '../../components/10_privateRoute/PrivateRoute'

export const GamePage = () => {
   const match = useRouteMatch()
   const { canRedirect } = useSelector(state => state.gamePage)
   return (
      <Switch>
         <PrivateRoute path={`${match.path}/`} exact component={StartPage} />
         <PrivateRoute path={`${match.path}/board`} component={Board} />
         {canRedirect && <PrivateRoute path={`${match.path}/finish`} component={Finish} />}
      </Switch>
   )
}
