import cn from 'classnames'
import s from './Style.module.css'

export const Input = ({ label, type, value, onChange, name, required }) => {
   return (
      <div class={s.root}>
         <input type={type} class={cn(s.input, {[s.valid]: value.length > 0 })} required={required} onChange={onChange} value={value} name={name} />
         <span class={s.highlight}></span>
         <span class={s.bar}></span>
         <label class={s.label}>{label}</label>
      </div>
   )
}
