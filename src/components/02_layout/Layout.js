import s from './Layout.module.css'
import PropTypes from 'prop-types'
import cn from 'classnames'
import React from 'react'

export const Layout = ({ id, title, urlBg, colorBg, children }) => {
   return (
      <section className={s.root} id={id} style={{ backgroundImage: `url(${urlBg})`, backgroundColor: colorBg }}>
         <div className={s.wrapper}>
            <article>
               <div className={s.title}>
                  <h3>{title}</h3>
                  <span className={s.separator} />
               </div>
               <div className={cn(s.desc, { [s.descFull]: children })}>{children}</div>
            </article>
         </div>
      </section>
   )
}

Layout.propTypes = {
   id: PropTypes.number.isRequired,
   title: PropTypes.string.isRequired,
   urlBg: PropTypes.oneOf([PropTypes.string, PropTypes.null]),
   colorBg: PropTypes.oneOf([PropTypes.string, PropTypes.null]),
}

Layout.defaultProps = {
   urlBg: null,
   colorBg: null,
}
