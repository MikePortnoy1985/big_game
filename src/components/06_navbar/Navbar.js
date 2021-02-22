import cn from 'classnames'
import PropTypes from 'prop-types'
import s from './Navbar.module.css'
import { Arrow } from '../../utils/arrow/Arrow.js'
import { useRouteMatch } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/pokemon.svg'

export const NavBar = ({ handleClick, bgActive, isActive }) => {
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
            <a className={cn(s.menuButton, { [s.active]: isActive === true })} onClick={handleClick}>
               <span />
            </a>
         </div>
      </nav>
   )
}

NavBar.propTypes = {
   handleClick: PropTypes.func.isRequired,
   isActive: PropTypes.oneOf([PropTypes.bool, PropTypes.null]),
   bgActive: PropTypes.bool.isRequired,
}
