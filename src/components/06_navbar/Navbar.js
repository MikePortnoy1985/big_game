import cn from 'classnames'
import PropTypes from 'prop-types'
import { Arrow } from '../../utils/arrow/Arrow.js'
import { useRouteMatch } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/pokemon.svg'
import { ReactComponent as Login } from '../../assets/login.svg'
import s from './Navbar.module.css'


export const NavBar = ({ handleClick, bgActive, isActive, handleLogin }) => {
   const match = useRouteMatch('/')

   return (
      <nav className={cn(s.navbar, { [s.bgActive]: bgActive })}>
         <div className={s.navWrapper}>
            <div style={{ position: 'relative' }}>
               {!match.isExact && <Arrow text={'return to home'} />}
               <div className={s.brand}>
                  <Logo />
               </div>
            </div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <div className={s.loginAndMenu} >
               <div className={s.loginWrap} onClick={handleLogin}>
                  <Login/>
               </div>
               <div className={cn(s.menuButton, { [s.active]: isActive === true })} onClick={handleClick}>
                  <span />
               </div>
            </div>
         </div>
      </nav>
   )
}

NavBar.propTypes = {
   handleClick: PropTypes.func.isRequired,
   isActive: PropTypes.oneOf([PropTypes.bool, PropTypes.null]),
   bgActive: PropTypes.bool.isRequired,
}
