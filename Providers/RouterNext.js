import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

const RouterContext = React.createContext({ currentRoute: '', eventRoute: '' })

const RouterNextProvider = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentRoute: props.pathname,
      eventRoute: 'pageLoad'
    }
  }

  componentDidMount() {
    this._mounted = true
    Router.router.events.on('routeChangeStart', this.callback('routeChangeStart').bind(this))
    Router.router.events.on('routeChangeComplete', this.callback('routeChangeComplete').bind(this))
    Router.router.events.on('routeChangeError', this.callback('routeChangeError').bind(this))
    Router.router.events.on('beforeHistoryChange', this.callback('beforeHistoryChange').bind(this))
    Router.router.events.on('hashChangeStart', this.callback('hashChangeStart').bind(this))
    Router.router.events.on('hashChangeComplete', this.callback('hashChangeComplete').bind(this))
  }

  componentWillUnmount() {
    this._mounted = false
    Router.router.events.off('routeChangeStart', this.callback('routeChangeStart').bind(this))
    Router.router.events.off('routeChangeComplete', this.callback('routeChangeComplete').bind(this))
    Router.router.events.off('routeChangeError', this.callback('routeChangeError').bind(this))
    Router.router.events.off('beforeHistoryChange', this.callback('beforeHistoryChange').bind(this))
    Router.router.events.off('hashChangeStart', this.callback('hashChangeStart').bind(this))
    Router.router.events.off('hashChangeComplete', this.callback('hashChangeComplete').bind(this))
  }

  getQueryParams(qs) {
    qs = qs.split('+').join(' ')
    let params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g

    while ((tokens = re.exec(qs))) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
    }

    return params
  }

  callback = eventRoute => (url, err) => {
    if (this._mounted) {
      const query = this.getQueryParams(document.location.search)
      this.setState({ currentRoute: url, eventRoute, err, query, pp: 8 })
    }
  }

  render() {
    return (
      <RouterContext.Consumer>{context => this.props.children({ ...context, ...this.state })}</RouterContext.Consumer>
    )
  }
}

RouterNextProvider.propTypes = {
  children: PropTypes.any,
  pathname: PropTypes.string
}

export { RouterNextProvider }
