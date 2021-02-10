import cn from 'classnames'
import s from './PokemonCard.module.css'
import cardBack from '../../assets/card-back-side.jpg'
import PropTypes from 'prop-types'

export const PokemonCard = ({
   name,
   img,
   id,
   type,
   values,
   active,
   minimize,
   className,
   isSelected,
   handleSelected,
}) => {
   return (
      <div
         className={cn(className, s.pokemonCard, { [s.active]: active, [s.selected]: isSelected })}
         onClick={handleSelected}>
         <div className={s.cardFront}>
            <div className={cn(s.wrap, s.front)}>
               <div className={cn(s.pokemon, s[type])}>
                  <div className={s.values}>
                     <div className={cn(s.count, s.top)}>{values.top}</div>
                     <div className={cn(s.count, s.right)}>{values.right}</div>
                     <div className={cn(s.count, s.bottom)}>{values.bottom}</div>
                     <div className={cn(s.count, s.left)}>{values.left}</div>
                  </div>
                  <div className={s.imgContainer}>
                     <img src={img} alt={name} />
                  </div>
                  {!minimize && (
                     <div className={s.info}>
                        <span className={s.number}>#{id}</span>
                        <h3 className={s.name}>{name}</h3>
                        <small className={s.type}>
                           Type: <span>{type}</span>
                        </small>
                     </div>
                  )}
               </div>
            </div>
         </div>

         <div className={s.cardBack}>
            <div className={cn(s.wrap, s.back)} />
         </div>
      </div>
   )
}

PokemonCard.propTypes = {
   name: PropTypes.string.isRequired,
   img: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
   type: PropTypes.string.isRequired,
   active: PropTypes.bool.isRequired,
   values: PropTypes.shape({
      top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   }),
}
PokemonCard.defaultProps = {
   active: true,
}
