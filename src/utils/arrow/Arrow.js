import PropTypes from 'prop-types'
import s from './Arrow.module.css'
import { useHistory } from 'react-router-dom'

export const Arrow = () => {
   const history = useHistory()

   const handleGoHome = () => {
      history.push('/')
   }

   return (
      <div className={s.root} onClick={e => e && handleGoHome()}>
         {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/anchor-has-content */}
         <a href='' className={s.arrow} />
      </div>
   )
}

Arrow.propTypes = {
   text: PropTypes.string.isRequired,
}
