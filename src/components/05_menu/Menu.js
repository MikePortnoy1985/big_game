import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import s from './Menu.module.css'
import cn from 'classnames'

const MENU = [
   {
      title: 'HOME',
      to: '/',
   },
   {
      title: 'GAME',
      to: '/game',
   },
   {
      title: 'ABOUT',
      to: '/about',
   },
   {
      title: 'CONTACT',
      to: '/contact',
   },
]

export const Menu = ({ handleClick, isActive }) => {
   return (
      <div
         className={cn(s.menuContainer, { [s.active]: isActive === true, [s.deactive]: isActive === false })}
         onClick={handleClick}>
         <div className={s.overlay} />
         <ul>
            {MENU.map(({ title, to }, index) => (
               <li key={index}>
                  <Link to={to}>{title}</Link>
               </li>
            ))}
         </ul>
      </div>
   )
}

Menu.propTypes = {
   handleClick: PropTypes.func.isRequired,
   isActive: PropTypes.oneOf([PropTypes.bool, PropTypes.null]),
}
