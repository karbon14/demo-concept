import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const Modal = class extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    onClose: PropTypes.func,
    contentStyle: PropTypes.object
  }

  constructor() {
    super()
    this._ref = React.createRef()
  }

  componentDidMount() {
    this._htmlPosition = document.body.parentElement.style.position
    document.body.style.position = 'fixed'

    document.addEventListener('mousedown', this.onClickOutside)
    document.addEventListener('keyup', this.onEscape)
  }

  componentWillUnmount() {
    document.body.style.position = this._htmlPosition
    document.removeEventListener('mousedown', this.onClickOutside)
    document.removeEventListener('keyup', this.onEscape)
  }

  onClickOutside = ({ target }) => {
    if (this._ref.current && !this._ref.current.contains(target)) {
      this.props.onClose(false)
    }
  }

  onEscape = ({ keyCode }) => keyCode === 27 && this.props.onClose(false)

  render() {
    const { onClose, children, contentStyle = {}, ...props } = this.props

    return (
      <div className={style.overlay}>
        <div style={contentStyle} className="content" ref={this._ref}>
          {cloneElement(children, { props, onClose })}
        </div>
      </div>
    )
  }
}

export { Modal }
