import React from 'react'
import signalhub from 'signalhub'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

const SignalhubContext = React.createContext({ messages: [], appName: '', channel: '', broadcast: noop })

class Provider extends React.Component {
  constructor() {
    super()

    this.broadcast = () => {}
    this.signalUrls = ['http://localhost:8080']
    this.appName = 'appName'
    this.channel = 'karbon14'
    this.hub = signalhub(this.appName, this.signalUrls)

    this.state = {
      broadcast: this.hub.broadcast.bind(this.hub),
      channel: this.channel,
      appName: this.appName,
      messages: []
    }
  }

  componentDidMount() {
    this.hub.subscribe(this.channel).on('data', message => {
      // console.log('message ', message)
      this.setState({ messages: [...this.state.messages, message] })
    })
  }

  render() {
    return <SignalhubContext.Provider value={this.state}>{this.props.children}</SignalhubContext.Provider>
  }
}

Provider.propTypes = {
  children: PropTypes.node,
  messages: PropTypes.arrayOf(PropTypes.object)
}

export const Signalhub = {
  Consumer: SignalhubContext.Consumer,
  Provider
}
