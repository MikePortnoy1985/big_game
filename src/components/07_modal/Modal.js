import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import s from './Style.module.css'

export const Modal = ({ title, children, handleCloseModal, isOpen }) => {
   const modalRef = React.useRef()

   React.useEffect(() => {
      if (isOpen) {
         document.querySelector('body').style.overflow = 'hidden'
      }
   }, [isOpen])

   const handleBlur = event => {
      if (!modalRef.current.contains(event.target)) {
         handleCloseModal()
      }
   }

   return (
      <div className={cn(s.root, { [s.open]: isOpen })} onClick={handleBlur}>
         <div className={s.modal} ref={modalRef}>
            <div className={s.head}>
               {title}
               <span className={s.btnClose} onClick={handleCloseModal} />
            </div>
            <div className={s.content}>{children}</div>
         </div>
      </div>
   )
}

Modal.propTypes = {
   title: PropTypes.string.isRequired,
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
   handleCloseModal: PropTypes.func.isRequired,
   isOpen: PropTypes.bool.isRequired,
}
