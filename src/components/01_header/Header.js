import s from './Header.module.css'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Header = ({ title, descr }) => {
   const history = useHistory()
   const handleClick = () => {
      history.push('/game')
   }
   return (
      <header className={s.root}>
         <div className={s.forest} />
         <div className={s.silhouette} />
         <div className={s.moon} />
         <div className={s.container}>
            <h1>{title}</h1>
            <p>{descr}</p>
            <button className={s.button} onClick={handleClick}>
               Start game
            </button>
         </div>
      </header>
   )
}

Header.propTypes = {
   title: PropTypes.string.isRequired,
   descr: PropTypes.string.isRequired,
}
