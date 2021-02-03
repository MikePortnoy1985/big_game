import s from './Header.module.css'
import PropTypes from 'prop-types'

export const Header = ({ title, descr, handleChangePage }) => {
   const handleClick = () => {
      handleChangePage && handleChangePage('game')
   }
   return (
      <header className={s.root}>
         <div className={s.forest} />
         <div className={s.container}>
            <h1>{title}</h1>
            <p>{descr}</p>
            <button onClick={handleClick}>Start game</button>
         </div>
      </header>
   )
}

Header.propTypes = {
   title: PropTypes.string.isRequired,
   descr: PropTypes.string.isRequired,
   handleChangePage: PropTypes.func.isRequired,
}
