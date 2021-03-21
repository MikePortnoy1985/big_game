import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '../09_input/Input'

import s from './Style.module.css'

export const LoginForm = ({ onSubmit, isOpenModal }) => {
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('')
   const [regOrLog, setRegOrLog] = React.useState('Sign in')
   const [requestType, setRequestType] = React.useState('Sign Up')

   const handleSubmit = e => {
      e.preventDefault()
      onSubmit({ email, password }, requestType)
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
            {regOrLog === 'Register' ? (
               <button className={s.button} onClick={() => setRequestType('Sign In')}>
                  'Sign In'
               </button>
            ) : (
               <button className={s.button} onClick={() => setRequestType('Sign Up')}>
                  'Sign Up'
               </button>
            )}
            <div
               className={s.answer}
               onClick={e => setRegOrLog(prevState => (prevState === 'Register' ? 'Sign in' : 'Register'))}>
               {regOrLog}
            </div>
         </div>
      </form>
   )
}

LoginForm.propTypes = {
   onSubmit: PropTypes.func.isRequired,
   isOpenModal: PropTypes.bool.isRequired,
}
