import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { Button } from 'Components/Core/Button'
import Success from '/static/icons/success.svg'

const SuccessSplash = ({ splashMessage, submitLabel, onSubmit }) => (
  <section className={style.SuccessSplash}>
    <img src={Success} />
    <p>{splashMessage}</p>
    <Button label={submitLabel} type="primary" onClick={onSubmit} />
  </section>
)

SuccessSplash.propTypes = {
  splashMessage: PropTypes.any,
  submitLabel: PropTypes.string,
  onSubmit: PropTypes.func
}

export { SuccessSplash }
