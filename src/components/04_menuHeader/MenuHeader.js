import React from 'react'
import { Menu } from '../05_menu/Menu.js'
import { NavBar } from '../06_navbar/Navbar'
import { Modal } from '../07_modal/Modal'
import { LoginForm } from '../08_loginForm/LoginForm.js'

export const MenuHeader = ({ bgActive }) => {
   const [isActive, setActive] = React.useState(null)
   const [isOpenModal, setOpenModal] = React.useState(false)

   const handleClick = e => {
      e && setActive(!isActive)
   }

   const handleLogin = () => {
      setOpenModal(prevState => !prevState)
   }

   const onSubmit = values => {
      
   }

   return (
      <>
         <Menu handleClick={handleClick} isActive={isActive} />
         <NavBar handleClick={handleClick} isActive={isActive} bgActive={bgActive} handleLogin={handleLogin} />
         <Modal isOpen={isOpenModal} title={'Log in....'} handleCloseModal={handleLogin}>
            <LoginForm onSubmit={onSubmit} isOpenModal={isOpenModal}/>
         </Modal>
      </>
   )
}
