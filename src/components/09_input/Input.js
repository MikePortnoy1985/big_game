import cn from 'classnames'
import PropTypes from 'prop-types'
import s from './Style.module.css'

export const Input = ({ label, type, value, onChange, name, required }) => {
   return (
      <div className={s.root}>
         <input
            type={type}
            className={cn(s.input, { [s.valid]: value.length > 0 })}
            required={required}
            onChange={onChange}
            value={value}
            name={name}
         />
         <span className={s.highlight} />
         <span className={s.bar} />
         <label className={s.label}>{label}</label>
      </div>
   )
}

Input.propTypes = {
   label: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool.isRequired,
}
