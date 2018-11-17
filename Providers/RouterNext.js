import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

const RouterContext = React.createContext({ currentRoute: '', eventRoute: '' })

class Provider extends React.Component {
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
    return <RouterContext.Provider value={this.state}>{this.props.children}</RouterContext.Provider>
  }
}

Provider.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string
}

export const RouterNext = {
  Consumer: RouterContext.Consumer,
  Provider
}
