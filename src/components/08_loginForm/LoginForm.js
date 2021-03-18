import React from 'react'
import { Input } from '../09_input/Input'

import s from './Style.module.css'

export const LoginForm = ({ onSubmit, isOpenModal }) => {
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('')
   const [regOrLog, setRegOrLog] = React.useState('Sign in?')

   const handleSubmit = e => {
      e.preventDefault()
      onSubmit({ email, password })
   }

   React.useEffect(() => {
      if (!isOpenModal) {
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
         <div className={s.buttonWrapper}>
            {regOrLog === 'Register ?' ? (
               <button className={s.button}>'Sign in'</button>
            ) : (
               <button className={s.button}>'Sign up'</button>
            )}
            <div
               className={s.answer}
               onClick={e => setRegOrLog(prevState => (prevState === 'Register ?' ? 'Login ?' : 'Register ?'))}>
               {regOrLog}
            </div>
         </div>
      </form>
   )
}
