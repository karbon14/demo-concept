import React from 'react'
import { Error404 } from './Error404'
import style from './style.scss'
import PropTypes from 'prop-types'

const ErrorComponent = ({ statusCode = 'unknown' }) => {
  const statusHandler = () => {
    switch (statusCode) {
      case 404:
        return <Error404 />

      default:
        return <div className="content">Error {statusCode}</div>
    }
  }

  return (
    <div className="container">
      {statusHandler()}
      <style jsx>{style}</style>
    </div>
  )
}

ErrorComponent.propTypes = {
  statusCode: PropTypes.number
}
export default ErrorComponent
