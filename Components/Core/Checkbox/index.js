import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const Checkbox = ({ label, value, onBlur, onChange, ...rest }) => (
  <div className={style.react__core__checkbox}>
    <label>
      <input {...rest} type="checkbox" checked={value} onBlur={onBlur} onChange={onChange} />
      <span className="checkbox__draw">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
          <path d="M23.6 5L22 3.4c-.5-.4-1.2-.4-1.7 0L8.5 15l-4.8-4.7c-.5-.4-1.2-.4-1.7 0L.3 11.9c-.5.4-.5 1.2 0 1.6l7.3 7.1c.5.4 1.2.4 1.7 0l14.3-14c.5-.4.5-1.1 0-1.6z" />
        </svg>
      </span>
      {label}
    </label>
  </div>
)

Checkbox.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
}

Checkbox.defaultProps = {
  label: '',
  value: false
}

export { Checkbox }
