import React from 'react'
import { NotificationManager } from 'react-notifications'
import { Menu } from '../05_menu/Menu.js'
import { NavBar } from '../06_navbar/Navbar'
import { Modal } from '../07_modal/Modal'
import { LoginForm } from '../08_loginForm/LoginForm.js'
import { firebaseApi } from '../../api/firebase'

export const MenuHeader = ({ bgActive }) => {
   const [isActive, setActive] = React.useState(null)
   const [isOpenModal, setOpenModal] = React.useState(false)

   const handleClick = e => {
      e && setActive(!isActive)
   }

   const handleLogin = () => {
      setOpenModal(prevState => !prevState)
   }

   const onSubmit = async values => {
      const { email, password } = values
      const response = await firebaseApi.submit(email, password)
      if (response.hasOwnProperty('error')) {
         NotificationManager.error(response.error.message, 'Wrong email or password!')
      } else {
         localStorage.setItem('idToken', response.idToken)
         NotificationManager.success('Account created')
      }
   }

   return (
      <>
         <Menu handleClick={handleClick} isActive={isActive} />
         <NavBar handleClick={handleClick} isActive={isActive} bgActive={bgActive} handleLogin={handleLogin} />
         <Modal isOpen={isOpenModal} title={'Log in....'} handleCloseModal={handleLogin}>
            <LoginForm onSubmit={onSubmit} isOpenModal={isOpenModal} />
         </Modal>
      </>
   )
}
