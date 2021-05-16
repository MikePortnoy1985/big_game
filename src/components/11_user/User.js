import React from 'react'
import { useHistory } from 'react-router-dom'
import { setId } from '../../store/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import s from './Style.module.css'

export const User = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const { data } = useSelector(state => state.user)

   const handleLogout = () => {
      dispatch(setId(null))
      localStorage.removeItem('BigGameIdToken')
      history.push('/')
   }
   return (
      <>
         <h3>Email: {data.email}</h3>
         <button className={s.button} onClick={handleLogout}>
            Logout
         </button>
      </>
   )
}
