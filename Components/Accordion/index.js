import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Component from '@reactions/component'
import style from './style.scss'

const Accordion = ({ openStates, options }) => (
  <Component
    initialState={{ openStates }}
    render={({ state, setState }) => (
      <div className={style.accordion__container}>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => {
                let newState = state.openStates
                state.openStates[index] = !state.openStates[index]
                setState({ openStates: newState })
              }}
              className={classNames({ accordion: true, active: state.openStates[index] })}
            >
              {option.label}
            </button>

            <div
              className="panel"
              style={{
                display: state.openStates[index] ? 'block' : 'none',
                width: state.openStates[index] ? 'initial' : '0'
              }}
            >
              {option.child}
            </div>
          </React.Fragment>
        ))}
      </div>
    )}
  />
)

Accordion.propTypes = {
  openStates: PropTypes.array,
  options: PropTypes.array
}

Accordion.defaultProps = {
  openStates: [],
  options: []
}

export { Accordion }
