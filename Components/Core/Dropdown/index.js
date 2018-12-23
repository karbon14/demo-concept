import React from 'react'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import style from './style.scss'

const Dropdown = ({ onToggling = noop, onSelect, selected, data, isOpen }) => (
  <div className={style.dropdown}>
    <div className={'dropdown-container ' + (isOpen ? 'show' : '')}>
      <div className={'dropdown-display ' + (isOpen ? 'clicked' : '')} onClick={onToggling}>
        <span>{selected ? selected : ''}</span>
        <i className="fa fa-angle-down arrow-down" />
      </div>
      <div className="dropdown-list">
        {data.length ? (
          <div>
            {data
              .filter(value => value.key !== (selected ? selected.key : ''))
              .map((item, index) => (
                <div onClick={() => onSelect(item.key)} key={index}>
                  <span>{item.key}</span>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </div>
  </div>
)

Dropdown.defaultProps = {
  isOpen: false,
  onToggling: noop,
  onSelect: noop
}

Dropdown.propTypes = {
  onToggling: PropTypes.any,
  onSelect: PropTypes.any,
  selected: PropTypes.string,
  data: PropTypes.array,
  isOpen: PropTypes.bool
}

export { Dropdown }
