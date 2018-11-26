import React from 'react'
import signalhub from 'signalhub'
import PropTypes from 'prop-types'
import { toast } from 'Components/Toast'

const SignalHubContext = React.createContext({ messages: [], appName: '', channel: '', broadcast: new Function() })

const SignalHubProvider = class extends React.Component {
  constructor() {
    super()

    this.broadcast = () => {}
    this.signalUrls = ['http://localhost:8080']
    this.appName = 'appName'
    this.channel = 'karbon14'
    this.hub = signalhub(this.appName, this.signalUrls)

    this.state = {
      broadcast: this.hub.broadcast.bind(this.hub),
      subscribe: this.hub.subscribe.bind(this.hub),
      channel: this.channel,
      appName: this.appName,
      messages: [],
      receivedMsg: '',
      setReceivedMsg: receivedMsg => this.setState({ receivedMsg }),
      saveMessage: msg => this.setState({ messages: [...this.state.messages, msg] }),
      removeMessage: proof =>
        this.setState({
          messages: this.state.messages.filter(_ => _.proof.address !== proof.address)
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.messages.length > prevState.messages.length) {
      toast.info(this.state.receivedMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
    }
  }

  render() {
    return (
      <SignalHubContext.Consumer>
        {context => this.props.children({ ...context, ...this.state })}
      </SignalHubContext.Consumer>
    )
  }
}

SignalHubProvider.propTypes = {
  children: PropTypes.func
}

export { SignalHubProvider }
