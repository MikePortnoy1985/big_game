import cn from 'classnames'
import PropTypes from 'prop-types'
import s from './Navbar.module.css'

export const NavBar = ({ handleClick, bgActive, isActive }) => {
   return (
      <nav className={cn(s.navbar, { [s.bgActive]: bgActive })}>
         <div className={s.navWrapper}>
            <p className={s.brand}>LOGO</p>
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
   isActive: PropTypes.bool.isRequired,
   bgActive: PropTypes.bool.isRequired,
}

NavBar.defaultProps = {
   bgActive: false,
}
