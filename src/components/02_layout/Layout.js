import s from './Layout.module.css'
import PropTypes from 'prop-types'

export const Layout = ({ id, title, descr, urlBg, colorBg }) => {
   return (
      <section className={s.root} id={id} style={{ backgroundImage: `url(${urlBg})`, backgroundColor: `${colorBg}` }}>
         <div className={s.wrapper}>
            <article>
               <div className={s.title}>
                  <h3>{title}</h3>
                  <span className={s.separator} />
               </div>
               <div className={descr ? `${s.desc} ${s.descFull}` : s.desc}>
                  <p>{descr}</p>
               </div>
            </article>
         </div>
      </section>
   )
}

Layout.propTypes = {
   id: PropTypes.number.isRequired,
   title: PropTypes.string.isRequired,
   descr: PropTypes.string.isRequired,
   urlBg: PropTypes.string || PropTypes.null,
   colorBg: PropTypes.string || PropTypes.null,
}

Layout.defaultProps = {
   descr: '',
   urlBg: null,
   colorBg: null,
}
