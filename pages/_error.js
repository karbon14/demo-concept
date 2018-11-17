import React from 'react'
import Head from 'next/head'
import ErrorComponent from 'Components/Error'
import PropTypes from 'prop-types'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <div>
        <Head>
          <title>Error {this.props.statusCode}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <ErrorComponent statusCode={this.props.statusCode} />
      </div>
    )
  }
}

Error.propTypes = {
  statusCode: PropTypes.number
}
