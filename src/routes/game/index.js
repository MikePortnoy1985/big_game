import PropTypes from 'prop-types'

export const GamePage = ({ handleChangePage }) => {
   const handleClick = () => {
      handleChangePage && handleChangePage('app')
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
