import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

export const GamePage = () => {
   const history = useHistory()
   const handleClick = () => {
      history.push('/')
   }

   return (
      <>
         <div>This is game page!!!</div>
         <button onClick={handleClick}>Return to home page</button>
      </>
   )
}

GamePage.propTypes = {
   handleChangePage: PropTypes.func.isRequired,
}
