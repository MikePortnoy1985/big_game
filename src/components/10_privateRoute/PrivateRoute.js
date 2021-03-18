import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ Component, ...rest }) => {
   return (
      <>
         <Route
            {...rest}
            render={props => (localStorage.getItem('idToken') ? <Component {...props} /> : <Redirect to='/' />)}
         />
      </>
   )
}
