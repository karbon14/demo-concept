import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Provider } from '@react-core/theme-provider'

const Select = ({ options, defaultLabel, theme, ...rest }) => (
  <Provider
    theme={theme}
    componentName={'Select'}
    render={({ style }) => (
      <div
        className={classNames({
          disabled: rest.disabled,
          unselected: rest.value === ''
        })}
      >
        <select {...rest}>
          {!rest.value &&
            defaultLabel && (
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
        <style jsx>{style}</style>
      </div>
    )}
  />
)

Select.propTypes = {
  options: PropTypes.array,
  defaultLabel: PropTypes.string,
  theme: PropTypes.object
}

export { Select }
