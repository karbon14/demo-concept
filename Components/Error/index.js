import React from 'react'
import { Error404 } from './Error404'
import PropTypes from 'prop-types'
import style from './style.scss'

const ErrorComponent = ({ statusCode = 'unknown' }) => {
  const statusHandler = () => {
    switch (statusCode) {
      case 404:
        return <Error404 />

      default:
        return <div className="content">Error {statusCode}</div>
    }
  }

  return <div className={style.error_container}>{statusHandler()}</div>
}

ErrorComponent.propTypes = {
  statusCode: PropTypes.number
}
export default ErrorComponent
