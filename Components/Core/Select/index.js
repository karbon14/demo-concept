import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.scss'

const Select = ({ options, defaultLabel, ...rest }) => (
  <div className={style.react__core__select}>
    <div
      className={classNames({
        disabled: rest.disabled,
        unselected: rest.value === ''
      })}
    >
      <select {...rest}>
        {!rest.value && defaultLabel && (
          <option className="empty" value={null}>
            {defaultLabel}
          </option>
        )}
        {options.map(({ label, key, ...rest }) => (
          <option key={key} {...rest}>
            {label}
          </option>
        ))}
      </select>
    </div>
  </div>
)

Select.propTypes = {
  options: PropTypes.array,
  defaultLabel: PropTypes.string
}

export { Select }
