import React from 'react'
import PropTypes from 'prop-types'
import s from './Menu.module.css'
import cn from 'classnames'

export const Menu = ({ handleClick, isActive }) => {
   return (
      <div className={cn(s.menuContainer, { [s.active]: isActive })} onClick={handleClick}>
         <div className={s.overlay} />
         <div className={s.menuContainer}>
            <ul>
               <li>
                  <a href='#welcome'>HOME</a>
               </li>
               <li>
                  <a href='#game'>GAME</a>
               </li>
               <li>
                  <a href='#about'>ABOUT</a>
               </li>
               <li>
                  <a href='#contact'>CONTACT</a>
               </li>
            </ul>
         </div>
      </div>
   )
}

Menu.propTypes = {
   handleClick: PropTypes.func.isRequired,
   isActive: PropTypes.bool.isRequired,
}
