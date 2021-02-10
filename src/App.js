import React from 'react'
import cn from 'classnames'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import { HomePage } from './routes/home/Home'
import { GamePage } from './routes/game/GamePage'
import { AboutPage } from './routes/about/About'
import { ContactPage } from './routes/contact/Contact'
import { NotFoundPage } from './routes/notFound/NotFound'
import { MenuHeader } from './components/04_menuHeader/MenuHeader'
import { Footer } from './components/03_footer/Footer'
import { FirebaseContext } from './context/FirebaseContext'
import { database } from './api/firebase'
import s from './App.module.css'

export const App = () => {
   const match = useRouteMatch('/')
   return (
      <FirebaseContext.Provider value={database}>
         <Switch>
            <Route path={'/404'} component={NotFoundPage} />
            <Route>
               <>
                  <MenuHeader bgActive={!match.isExact} />
                  <div className={cn(s.wrap, { [s.isHomePage]: match.isExact })}>
                     <Switch>
                        <Route path={'/'} exact component={HomePage} />
                        <Route path={'/game'} component={GamePage} />
                        <Route path={'/about'} component={AboutPage} />
                        <Route path={'/contact'} component={ContactPage} />
                        <Route render={() => <Redirect to={'404'} />} />
                     </Switch>
                  </div>
                  <Footer />
               </>
            </Route>
         </Switch>
      </FirebaseContext.Provider>
   )
}
