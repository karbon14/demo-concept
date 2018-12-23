import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const setValue = event => {
  const input = event.target
  const value = input.value
  input.setAttribute('value', value)
}

const TextField = ({ label, placeholder, ...rest }) => (
  <div className={style.react__core__textfield}>
    <input onKeyUp={e => setValue(e)} placeholder={placeholder} {...rest} />
    <hr />
    <label>{label}</label>
  </div>
)

TextField.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.string
  }),
  placeholder: PropTypes.string,
  label: PropTypes.string
}

TextField.defaultProps = {
  classes: {},
  placeholder: '',
  label: ''
}

export { TextField }
