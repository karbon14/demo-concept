import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

const RouterContext = React.createContext({ currentRoute: '', eventRoute: '' })

const RouterNextProvider = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentRoute: props.pathname || '',
      eventRoute: 'pageLoad'
    }
  }

  componentDidMount() {
    Router.router.events.on('routeChangeStart', this.callback('routeChangeStart').bind(this))
    Router.router.events.on('routeChangeComplete', this.callback('routeChangeComplete').bind(this))
    Router.router.events.on('routeChangeError', this.callback('routeChangeError').bind(this))
    Router.router.events.on('beforeHistoryChange', this.callback('beforeHistoryChange').bind(this))
    Router.router.events.on('hashChangeStart', this.callback('hashChangeStart').bind(this))
    Router.router.events.on('hashChangeComplete', this.callback('hashChangeComplete').bind(this))
  }

  callback = eventRoute => (url, err) => this.setState({ currentRoute: url, eventRoute, err })

  render() {
    return <RouterContext.Consumer>{context => this.props.children({ context, ...this.state })}</RouterContext.Consumer>
  }
}

RouterNextProvider.propTypes = {
  children: PropTypes.any,
  pathname: PropTypes.string
}

export { RouterNextProvider }
