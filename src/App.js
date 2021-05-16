import React from 'react'
import cn from 'classnames'
import { NotificationContainer } from 'react-notifications'
import { useLocation, Route, Switch } from 'react-router-dom'
import { HomePage } from './routes/home/Home'
import { GamePage } from './routes/game/GamePage'
import { AboutPage } from './routes/about/About'
import { ContactPage } from './routes/contact/Contact'
import { NotFoundPage } from './routes/notFound/NotFound'
import { MenuHeader } from './components/04_menuHeader/MenuHeader'
import { Footer } from './components/03_footer/Footer'
import { User } from './components/11_user/User'
import { PrivateRoute } from './components/10_privateRoute/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './store/UserSlice'
import 'react-notifications/lib/notifications.css'
import s from './App.module.css'

export const App = () => {
   const location = useLocation()
   const isPadding = location.pathname === '/' || location.pathname === '/game/board'
   const { loading, id } = useSelector(state => state.user)
   const dispatch = useDispatch()
   const token = localStorage.getItem('BigGameIdToken')

   React.useEffect(() => {
      if (id || token) {
         dispatch(getUser())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (loading) {
      return <div>Loading ....</div>
   }

   return (
      <>
         <Switch>
            <Route>
               <MenuHeader bgActive={!isPadding} />
               <div className={cn(s.wrap, { [s.isHomePage]: isPadding })}>
                  <Switch>
                     <Route path={'/'} exact component={HomePage} />
                     <PrivateRoute path={'/game'} component={GamePage} />
                     <PrivateRoute path={'/about'} component={AboutPage} />
                     <PrivateRoute path={'/contact'} component={ContactPage} />
                     <PrivateRoute path={'/user'} component={User} />
                     <Route path={'*'} component={NotFoundPage} />
                  </Switch>
               </div>
               <Footer />
            </Route>
         </Switch>
         <NotificationContainer />
      </>
   )
}
