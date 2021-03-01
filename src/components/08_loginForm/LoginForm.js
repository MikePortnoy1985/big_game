import React from 'react'
import { Input } from '../09_input/Input'

import s from './Style.module.css'

export const LoginForm = ({ onSubmit, isOpenModal }) => {
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('')

   const handleSubmit = e => {
      e.preventDefault()
      onSubmit({ email, password })
   }

   React.useEffect(() => {
      if(!isOpenModal){
         setEmail('')
         setPassword('')
      }
   }, [isOpenModal])

   return (
      <form onSubmit={handleSubmit}>
         <Input
            type={'text'}
            label={'Email'}
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'email'}
            required
         />
         <Input
            type={'password'}
            label={'password'}
            onChange={e => setPassword(e.target.value)}
            value={password}
            name={'password'}
            required
         />

         <button className={s.button}>Login</button>
      </form>
   )
}
