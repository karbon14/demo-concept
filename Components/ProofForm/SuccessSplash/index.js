import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { theme } from 'Common/Core'
import { Button } from '@react-core/button'
import Success from '/static/icons/success.svg'

const SuccessSplash = ({ splashMessage, submitLabel, onSubmit }) => (
  <section>
    <img src={Success} />
    <p>{splashMessage}</p>
    <Button theme={theme} label={submitLabel} type="primary" onClick={onSubmit} />

    <style jsx>{style}</style>
  </section>
)

SuccessSplash.propTypes = {
  splashMessage: PropTypes.any,
  submitLabel: PropTypes.string,
  onSubmit: PropTypes.func
}

export { SuccessSplash }
