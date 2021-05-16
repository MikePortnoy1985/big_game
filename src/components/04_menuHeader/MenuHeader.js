import React from 'react'
import { setId } from '../../store/UserSlice'
import { useDispatch } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import { Menu } from '../05_menu/Menu.js'
import { NavBar } from '../06_navbar/Navbar'
import { Modal } from '../07_modal/Modal'
import { LoginForm } from '../08_loginForm/LoginForm.js'
import { firebaseApi } from '../../api/firebase'
import { herokuApi } from '../../api/heroku'

export const MenuHeader = ({ bgActive }) => {
   const [isActive, setActive] = React.useState(null)
   const [isOpenModal, setOpenModal] = React.useState(false)

   const dispatch = useDispatch()

   const handleClick = e => {
      e && setActive(!isActive)
   }

   const handleLogin = () => {
      setOpenModal(prevState => !prevState)
   }

   const onSubmit = async (values, type) => {
      const { email, password } = values
      let response
      if (type === 'Sign Up') {
         response = await firebaseApi.registration(email, password)
      } else {
         response = await firebaseApi.signIn(email, password)
      }
      if (response.hasOwnProperty('error')) {
         NotificationManager.error(response.error.message, 'Error')
      } else {
         if (type === 'Sign Up') {
            const startPack = await herokuApi.starterPack()
            startPack.data.forEach(pokemon => firebaseApi.addStartPokemons(response.localId, pokemon, response.idToken))
         }
         localStorage.setItem('BigGameIdToken', response.idToken)
         dispatch(setId(response.localId))
         NotificationManager.success('Success')
         handleLogin()
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
