import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.scss'
import Component from '@reactions/component'

const TabView = ({ options, initialValues }) => (
  <Component
    initialState={initialValues ? initialValues : { active: 0 }}
    render={({ state, setState }) => (
      <div className={style.react__core__tabview}>
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => setState({ active: index })}
              className={classNames({ 'nav-item': true, 'nav-active': index === state.active })}
            >
              {option.name}
            </li>
          ))}
        </ul>

        <div className="content-container">
          {options.map((option, index) => (
            <div key={index} className={classNames({ 'nav-hide': index !== state.active })}>
              {option.content}
            </div>
          ))}
        </div>
      </div>
    )}
  />
)

TabView.propTypes = {
  options: PropTypes.array,
  initialValues: PropTypes.object
}

TabView.defaultProps = {
  options: []
}

export { TabView }
