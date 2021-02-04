import React from 'react'
import { Menu } from '../05_menu/Menu.js'
import { NavBar } from '../06_navbar/Navbar'

export const MenuHeader = ({ bgActive }) => {
   const [isActive, setActive] = React.useState(null)
   const handleClick = e => {
      e && setActive(!isActive)
   }
   return (
      <>
         <Menu handleClick={handleClick} isActive={isActive} />
         <NavBar handleClick={handleClick} isActive={isActive} bgActive={bgActive} />
      </>
   )
}
