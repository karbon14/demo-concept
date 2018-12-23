import React from 'react'
export { toast } from 'react-toastify'
import { ToastContainer as ToastifyContainer } from 'react-toastify'
import style from './style.scss'

export const ToastContainer = ({ ...props }) => (
  <div className={style.react__core__toast}>
    <ToastifyContainer {...props} />
  </div>
)
